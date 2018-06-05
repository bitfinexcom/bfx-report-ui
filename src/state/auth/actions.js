import types from './constants'

export function setApiKey(key, secret) {
  return {
    type: types.SET_API_KEY,
    payload: {
      key,
      secret,
    },
  };
}

export function setAuthKey(key) {
  return {
    type: types.SET_AUTH_KEY,
    payload: key,
  };
}

export default {
  setApiKey,
}
