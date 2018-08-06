import types from './constants'

const initialState = {
  // apiKey: '', // moved to state/base
  // apiSecret: '',
  authToken: '',
  authStatus: null,
  isShown: true,
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_AUTH_STATUS:
      return {
        ...state,
        authStatus: action.payload,
        isShown: !action.payload,
      }
    case types.SHOW_AUTH:
      return {
        ...state,
        isShown: true,
      }
    case types.SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      }
    case types.LOGOUT:
      return {
        ...state,
        authStatus: false,
        isShown: true,
      }
    default:
      return state
  }
}

export default authReducer
