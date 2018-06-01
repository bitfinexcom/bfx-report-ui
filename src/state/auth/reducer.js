import types from './constants'

const initialState = {
  key: '',
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_API_KEY:
      return {
        ...state,
        key: action.payload,
      };
    case types.SET_AUTH:
      return {
        ...state,
        key: action.payload,
      }
    default:
      return state;
  }
}

export default authReducer
