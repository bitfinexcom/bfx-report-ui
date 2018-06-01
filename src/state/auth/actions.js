import types from './constants'

export function setApiKey(key) {
  return {
    type: types.SET_API_KEY,
    payload: key,
  };
}

export default {
  setApiKey,
}
