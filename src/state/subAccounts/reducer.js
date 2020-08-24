import authTypes from 'state/auth/constants'
import _get from 'lodash/get'

import types from './constants'

export const initialState = {
  subUsers: [],
}

export function subAccountsReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.SET:
      return {
        ...state,
        subUsers: _get(payload, 'subUsers', []),
      }
    case types.ADD_SUCCESS:
      return {
        ...state,
        subUsers: payload || [],
      }
    case types.REMOVE_SUCCESS:
      return {
        ...state,
        subUsers: [],
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default subAccountsReducer
