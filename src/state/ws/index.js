import { store } from 'state/store'

import { getAuthData, selectAuth } from 'state/auth/selectors'
import { platform } from 'var/config'

import types from './constants'

const { CI_ENVIRONMENT_NAME = 'development' } = process.env

const getAuth = () => {
  const state = store.getState()
  return selectAuth(state)
}

// initial auth with /login requires email/password even if token already present
const getLoginAuth = () => {
  const state = store.getState()
  const { email, password } = getAuthData(state)
  return { email, password }
}

class WS {
  constructor() {
    this.isConnected = false
    this.websocket = null
    this.isFirstConnect = true
  }

  heartbeat = () => {
    clearTimeout(this.pingTimeout)

    this.pingTimeout = setTimeout(() => {
      this.disconnect()
    }, 13000)
  }

  connect = () => {
    if (!platform.showFrameworkMode || this.isConnected) {
      return
    }

    const websocket = new WebSocket(platform.WS_ADDRESS)
    this.websocket = websocket

    // allows async use from sagas
    let resolver
    const isConnectionOpen = new Promise((res) => {
      resolver = res
    })

    websocket.onopen = () => {
      this.isConnected = true
      store.dispatch({ type: types.WS_CONNECT })

      if (!this.isFirstConnect) {
        store.dispatch({ type: types.WS_RECONNECT })
      }
      this.isFirstConnect = false

      this.heartbeat()
      resolver()
    }

    websocket.onclose = () => {
      this.isConnected = false
      this.connect()
    }

    websocket.onmessage = this.onMessage

    websocket.onerror = (err) => {
      if (CI_ENVIRONMENT_NAME === 'development') {
        console.error(err) // eslint-disable-line no-console
      }
      resolver()
      websocket.close()
    }

    // eslint-disable-next-line consistent-return
    return isConnectionOpen
  }

  disconnect = () => {
    if (this.websocket) {
      this.websocket.close()
    }
  }

  signIn = (auth = getLoginAuth()) => {
    const { email, password } = auth
    this.send('signIn', {}, {
      email,
      password,
      isSubAccount: false,
    })
  }

  send = (method = '', params = {}, auth = getAuth()) => {
    if (!this.isConnected) {
      return
    }

    try {
      const data = {
        auth,
        method,
        params,
      }

      this.websocket.send(JSON.stringify(data))
    } catch (err) {
      if (CI_ENVIRONMENT_NAME === 'development') {
        console.error(err) // eslint-disable-line no-console
      }
    }
  }

  // dispatches incoming messages
  onMessage = (e) => {
    try {
      const data = JSON.parse(e.data)
      const { action, ...payload } = data

      if (!action) {
        return
      }

      if (action === '__ping__') {
        this.heartbeat()
        return
      }

      store.dispatch({ type: `ws_${action}`, payload })
    } catch (err) {
      console.error(err) // eslint-disable-line no-console
    }
  }
}

export default new WS()
