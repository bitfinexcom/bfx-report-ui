import _isEmpty from 'lodash/isEmpty'
import _pick from 'lodash/pick'

import { platform } from 'var/config'

const PERSISTED_PARAMS_WEB = [
  'apiKey',
  'apiSecret',
  'authToken',
]

const PERSISTED_PARAMS_FRAMEWORK = [
  'email',
  'password',
  'isNotProtected',
]

class Authenticator {
  getStored = () => {
    const auth = window.localStorage.getItem('auth')
    return auth ? JSON.parse(auth) : {}
  }

  hasData = () => !_isEmpty(this.getStored())

  persist = (data) => {
    window.localStorage.setItem('auth', JSON.stringify(data))
  }

  set = (data) => {
    const auth = this.getStored()
    const { apiKey, apiSecret, isPersisted } = data

    if (!isPersisted) {
      this.persist({
        isPersisted: false,
      })
      return
    }

    const persistedParams = platform.showFrameworkMode ? PERSISTED_PARAMS_FRAMEWORK : PERSISTED_PARAMS_WEB
    const persistedData = {
      ...auth,
      isPersisted: true,
      ..._pick(data, persistedParams),
    }

    // remove auth token after successful auth with apiKey and apiSecret
    if (!platform.showFrameworkMode && apiKey && apiSecret) {
      persistedData.authToken = ''
    }

    this.persist(persistedData)
  }
}

export default new Authenticator()
