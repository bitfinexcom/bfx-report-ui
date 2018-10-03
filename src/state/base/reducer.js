import authTypes from 'state/auth/constants'

import types from './constants'

// auth states are local cached
const initialState = {
  apiKey: '',
  apiSecret: '',
  authToken: '',
  locale: 'en',
  menuMode: types.MENU_MODE_NORMAL,
  theme: 'bp3_dark',
}

export function baseReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_API_KEY:
      return {
        ...state,
        apiKey: payload,
      }
    case types.SET_API_SECRET:
      return {
        ...state,
        apiSecret: payload,
      }
    case types.SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: payload,
      }
    case types.SET_LANG:
      return {
        ...state,
        locale: payload,
      }
    case types.SET_THEME:
      return {
        ...state,
        theme: payload,
      }
    case types.SET_MENU_MODE:
      return {
        ...state,
        menuMode: payload,
      }
    case authTypes.LOGOUT:
      return {
        ...state,
        authToken: '',
      }
    default:
      return state
  }
}

export default baseReducer
