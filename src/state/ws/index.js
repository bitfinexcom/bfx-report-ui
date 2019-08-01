import { store } from 'state/store'

const { REACT_APP_WS_ADDRESS } = process.env

class WS {
  constructor() {
    this.isConnected = false
    this.websocket = null

    this.connect()
  }

  connect = () => {
    const websocket = new WebSocket(REACT_APP_WS_ADDRESS)
    this.websocket = websocket

    let resolver
    const isConnectionOpen = new Promise((res) => {
      resolver = res
    })

    websocket.onopen = () => {
      this.isConnected = true
      resolver()
    }

    websocket.onclose = () => {
      this.isConnected = false
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

      if (action === '__ping__' || !action) {
        return
      }

      store.dispatch({ type: `ws_${action}`, payload })
    } catch (err) {
      console.error(err) // eslint-disable-line no-console
    }
  }
}

export default new WS()
