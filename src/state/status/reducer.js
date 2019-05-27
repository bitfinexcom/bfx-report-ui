import { Intent } from '@blueprintjs/core'

import types from './constants'

const initialState = {
  intent: '',
  msg: {},
}

export function statusReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.UPDATE_STATUS:
      return {
        ...state,
        intent: Intent.PRIMARY,
        msg: payload,
      }
    case types.UPDATE_SUCCESS_STATUS:
      return {
        ...state,
        intent: Intent.SUCCESS,
        msg: payload,
      }
    case types.UPDATE_WARNING_STATUS:
      return {
        ...state,
        intent: Intent.WARNING,
        msg: payload,
      }
    case types.UPDATE_ERROR_STATUS:
      return {
        ...state,
        intent: Intent.DANGER,
        msg: payload,
      }
    case types.CLEAR_STATUS:
      return initialState
    default:
      return state
  }
}

export default statusReducer
