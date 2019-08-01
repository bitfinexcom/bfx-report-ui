import types from './constants'

const initialState = {
  authStatus: null,
  isShown: true,
  loading: false,
}

export function authReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.CHECK_AUTH:
      return {
        ...state,
        loading: true,
      }
    case types.UPDATE_AUTH_STATUS:
      return {
        ...state,
        authStatus: payload,
        loading: payload, // eject from loading if auth fail
      }
    case types.SHOW_AUTH:
      return {
        ...state,
        isShown: true,
        loading: false,
      }
    case types.HIDE_AUTH:
      return {
        ...state,
        isShown: false,
        loading: false,
      }
    case types.LOGOUT:
      return initialState
    default:
      return state
  }
}

export default authReducer
