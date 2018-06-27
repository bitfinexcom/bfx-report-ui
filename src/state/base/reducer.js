import types from './constants'

// auth states are local cached
const initialState = {
  apiKey: '',
  apiSecret: '',
  authKey: '',
  // locale: 'en',
  // theme: 'dark',
}

export function baseReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_API_KEY:
      return {
        ...state,
        apiKey: action.payload,
      }
    case types.SET_API_SECRET:
      return {
        ...state,
        apiSecret: action.payload,
      }
    case types.SET_AUTH_KEY:
      return {
        ...state,
        authKey: action.payload,
      }
    default:
      return state
  }
}

export default baseReducer
