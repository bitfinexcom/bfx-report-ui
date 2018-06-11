import types from './constants'

export function checkAuth() {
  return {
    type: types.CHECK_AUTH,
  }
}

export function setApiKey(key) {
  return {
    type: types.SET_API_KEY,
    payload: key,
  }
}

export function setApiSecret(secret) {
  return {
    type: types.SET_API_SECRET,
    payload: secret,
  }
}

export function setAuthKey(key) {
  return {
    type: types.SET_AUTH_KEY,
    payload: key,
  }
}

export default {
  checkAuth,
  setApiKey,
  setApiSecret,
}
