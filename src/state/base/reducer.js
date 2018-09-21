import types from './constants'

// auth states are local cached
const initialState = {
  apiKey: '',
  apiSecret: '',
  locale: 'en',
  menuMode: types.MENU_MODE_NORMAL,
  theme: 'bp3_dark',
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
    case types.SET_LANG:
      return {
        ...state,
        locale: action.payload,
      }
    case types.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      }
    case types.SET_MENU_MODE:
      return {
        ...state,
        menuMode: action.payload,
      }
    default:
      return state
  }
}

export default baseReducer
