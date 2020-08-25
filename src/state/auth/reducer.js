import subAccountsTypes from 'state/subAccounts/constants'

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
    hasAuthData = Authenticator.hasData(),
    isPersisted = true,
    isNotProtected = true,
    isSubAccount = false,
  } = auth

  return {
    apiKey,
    apiSecret,
    authToken,
    email,
    password,
    hasAuthData,
    isPersisted,
    isNotProtected,
    isSubAccount,
  }
}

const initialState = {
  authStatus: null,
  ...getStoredAuth(),
  token: '',
  isShown: true,
  loading: false,
  users: [],
  usersLoading: false,
}

export function authReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.FETCH_USERS:
      return {
        ...state,
        usersLoading: true,
      }
    case types.ADD_USER:
    case subAccountsTypes.REMOVE_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => !(user.isSubAccount && user.email === payload)),
      }
    case types.SET_USERS:
      return {
        ...state,
        users: payload,
        usersLoading: false,
      }
    case types.SIGN_UP:
    case types.SIGN_IN:
    case types.RECOVER_PASSWORD:
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
        hasAuthData: true,
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
        users: state.users,
      }
    default:
      return state
  }
}

export default authReducer
