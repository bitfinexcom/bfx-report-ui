import types from './constants'

const initialState = {
  apiKey: '',
  apiSecret: '',
  authKey: '',
  isValid: null,
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_API_KEY:
      return {
        ...state,
        apiKey: action.payload.key,
        apiSecret: action.payload.secret,
      };
    case types.SET_AUTH_KEY:
      return {
        ...state,
        authKey: action.payload,
      }
    case types.UPDATE_AUTH_RESULT:
      return {
        ...state,
        isValid: action.payload,
      }
    default:
      return state
  }
}

export default authReducer
