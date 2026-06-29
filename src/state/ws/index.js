import _clamp from 'lodash/clamp'
import _random from 'lodash/random'

import { store } from 'state/store'

import { getWsAddress } from 'state/base/selectors'
import { getAuthData, selectAuth } from 'state/auth/selectors'
import config from 'config'

import types from './constants'

const { REACT_APP_ENV } = process.env

const RECONNECT_BASE_DELAY = 300 // ms
const RECONNECT_MAX_DELAY = 30000 // ms (cap)

// Full Jitter: random(0, min(cap, base * 2^attempt))
const getReconnectDelay = (attempt = 0) => {
  const exponential = _clamp(
    RECONNECT_BASE_DELAY * (2 ** attempt),
    RECONNECT_BASE_DELAY,
    RECONNECT_MAX_DELAY,
  )
  return _random(0, exponential)
}

const getAuth = () => {
  const state = store.getState()
  return selectAuth(state)
}

const getWsAddressFromStore = () => {
  const state = store.getState()
  return getWsAddress(state)
}

// initial auth with /login requires email/password even if token already present
const getLoginAuth = () => {
  const state = store.getState()
  const { email, password, isSubAccount } = getAuthData(state)
  return { email, password, isSubAccount }
}

class WS {
  constructor() {
    this.isConnected = false
    this.websocket = null
    this.isFirstConnect = true
    this.reconnectAttempts = 0
    this.reconnectTimeout = null
  }

  heartbeat = () => {
    clearTimeout(this.pingTimeout)

    this.pingTimeout = setTimeout(() => {
      this.disconnect()
    }, 13000)
  }

  connect = () => {
    clearTimeout(this.reconnectTimeout)

    if (!config.showFrameworkMode || this.isConnected) {
      return
    }

    const wsAddress = getWsAddressFromStore()
    const websocket = new WebSocket(wsAddress)
    this.websocket = websocket

    // allows async use from sagas
    let resolver
    const isConnectionOpen = new Promise((res) => {
      resolver = res
    })

    websocket.onopen = () => {
      this.isConnected = true
      this.reconnectAttempts = 0
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
      const delay = getReconnectDelay(this.reconnectAttempts)
      this.reconnectAttempts += 1
      this.reconnectTimeout = setTimeout(() => this.connect(), delay)
    }

    websocket.onmessage = this.onMessage

    websocket.onerror = (err) => {
      if (REACT_APP_ENV === 'development') {
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
    const { email, password, isSubAccount } = auth
    this.send('signIn', {}, {
      email,
      password,
      isSubAccount,
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
      if (REACT_APP_ENV === 'development') {
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
