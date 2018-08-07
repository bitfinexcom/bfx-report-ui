import { Intent } from '@blueprintjs/core'

import types from './constants'

const initialState = {
  intent: '',
  msg: '',
}

export function statusReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_STATUS:
      return {
        ...state,
        intent: Intent.PRIMARY,
        msg: action.payload,
      }
    case types.UPDATE_SUCCESS_STATUS:
      return {
        ...state,
        intent: Intent.SUCCESS,
        msg: action.payload,
      }
    case types.UPDATE_ERROR_STATUS:
      return {
        ...state,
        intent: Intent.DANGER,
        msg: action.payload,
      }
    case types.CLEAR_STATUS:
      return {
        ...state,
        intent: '',
        msg: '',
      }
    default:
      return state
  }
}

export default statusReducer
