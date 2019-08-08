import { store } from 'state/store'

import { selectAuth } from 'state/auth/selectors'
import { platform } from 'var/config'

import types from './constants'

const getAuth = () => {
  const state = store.getState()
  return selectAuth(state)
}

class WS {
  constructor() {
    this.isConnected = false
    this.websocket = null
  }

  heartbeat = () => {
    clearTimeout(this.pingTimeout)

    this.pingTimeout = setTimeout(() => {
      this.disconnect()
    }, 11000)
  }

  connect = () => {
    if (!platform.showFrameworkMode || this.isConnected) {
      return
    }

    const websocket = new WebSocket(platform.WS_ADDRESS)
    this.websocket = websocket

    let resolver
    const isConnectionOpen = new Promise((res) => {
      resolver = res
    })

    websocket.onopen = () => {
      this.isConnected = true
      this.send('login')
      this.heartbeat()
      store.dispatch({ type: types.WS_CONNECT })
      resolver()
    }

    websocket.onclose = () => {
      this.isConnected = false
      this.connect()
    }

    websocket.onmessage = this.onMessage

    websocket.onerror = (err) => {
      console.error(err) // eslint-disable-line no-console
      resolver()
      websocket.close()
      this.connect()
    }

    // eslint-disable-next-line consistent-return
    return isConnectionOpen
  }

  disconnect = () => {
    if (this.websocket) {
      this.websocket.close()
    }
  }

  send = (method = '', params = {}, auth = getAuth()) => {
    if (!this.isConnected) {
      return
    }

    try {
      const { apiKey, apiSecret } = auth

      const data = {
        auth: {
          apiKey,
          apiSecret,
        },
        method,
        params,
      }

      this.websocket.send(JSON.stringify(data))
    } catch (err) {
      console.error(err) // eslint-disable-line no-console
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
