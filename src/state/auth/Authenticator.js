import _pick from 'lodash/pick'

class Authenticator {
  getStored = () => {
    const auth = window.localStorage.getItem('auth')
    return auth ? JSON.parse(auth) : {}
  }

  persist = (data) => {
    window.localStorage.setItem('auth', JSON.stringify(data))
  }

  set = (data) => {
    const auth = this.getStored()
    const { isPersisted } = data

    if (!isPersisted) {
      this.persist({
        isPersisted: false,
        isNotFirstAuth: true,
      })
      return
    }

    this.persist({
      ...auth,
      ..._pick(data, ['apiKey', 'apiSecret', 'authToken', 'email', 'password', 'isPersisted']),
      isNotFirstAuth: true,
    })
  }
}

export default new Authenticator()
