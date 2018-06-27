import types from './constants'

/**
 * Create an action to store API key.
 * @param {string} key
 */
export function setApiKey(key) {
  return {
    type: types.SET_API_KEY,
    payload: key,
  }
}

/**
 * Create an action to store API secret.
 * @param {string} secret
 */
export function setApiSecret(secret) {
  return {
    type: types.SET_API_SECRET,
    payload: secret,
  }
}

/**
 * Create an action to store Auth key (UUID).
 * @param {string} key
 */
export function setAuthKey(key) {
  return {
    type: types.SET_AUTH_KEY,
    payload: key,
  }
}

export default {
  setApiKey,
  setApiSecret,
  setAuthKey,
}
