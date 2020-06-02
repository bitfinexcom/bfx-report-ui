import Authenticator from './Authenticator'
import types from './constants'

const getStoredAuth = () => {
  const auth = Authenticator.getStored()
  const {
    apiKey = '',
    apiSecret = '',
    authToken = '',
    email = '',
    password = '',
    isNotFirstAuth = false,
    isPersisted = true,
  } = auth

  return {
    apiKey,
    apiSecret,
    authToken,
    email,
    password,
    isNotFirstAuth,
    isPersisted,
  }
}

const initialState = {
  authStatus: null,
  ...getStoredAuth(),
  token: '',
  isShown: true,
  loading: false,
}

export function authReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.SIGN_UP:
    case types.SIGN_IN:
      return {
        ...state,
        loading: true,
      }
    case types.AUTH_SUCCESS:
      Authenticator.set({ ...payload, isPersisted: state.isPersisted })
      return {
        ...state,
        authStatus: true,
        loading: false,
        isNotFirstAuth: true,
        ...payload,
      }
    case types.UPDATE_AUTH:
      return {
        ...state,
        ...payload,
      }
    case types.UPDATE_AUTH_STATUS:
      return {
        ...state,
        authStatus: payload || null,
        loading: payload || false, // eject from loading if auth fail
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
      return {
        ...initialState,
        ...getStoredAuth(),
      }
    default:
      return state
  }
}

export default authReducer
