import authTypes from 'state/auth/constants'

import types from './constants'

export const initialState = []

export function candlesReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.SUB_ACCOUNTS_ADD:
      return [
        ...state,
        ...payload,
      ]
    case types.SUB_ACCOUNTS_REMOVE:
      return state.filter(subAccount => subAccount.id !== payload)
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default candlesReducer
