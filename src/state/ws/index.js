import { store } from 'state/store'

import { selectAuth } from 'state/auth/selectors'

const { REACT_APP_WS_ADDRESS } = process.env

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
    if (this.isConnected) {
      return
    }

    const websocket = new WebSocket(REACT_APP_WS_ADDRESS)
    this.websocket = websocket

    let resolver
    const isConnectionOpen = new Promise((res) => {
      resolver = res
    })

    websocket.onopen = () => {
      this.isConnected = true
      this.send('login', getAuth())
      this.heartbeat()
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

    return isConnectionOpen
  }

  disconnect = () => {
    if (this.websocket) {
      this.websocket.close()
    }
  }

  send = (method = '', auth = {}, params = {}) => {
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
