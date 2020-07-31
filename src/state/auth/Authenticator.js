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
  'isSubAccount',
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
    const { isPersisted } = data

    if (!isPersisted) {
      this.persist({
        isPersisted: false,
      })
      return
    }

    const persistedParams = platform.showFrameworkMode ? PERSISTED_PARAMS_FRAMEWORK : PERSISTED_PARAMS_WEB

    this.persist({
      ...auth,
      isPersisted: true,
      ..._pick(data, persistedParams),
    })
  }
}

export default new Authenticator()
