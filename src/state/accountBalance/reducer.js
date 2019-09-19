import authTypes from 'state/auth/constants'
import timeframeConstants from 'ui/TimeframeSelector/constants'

import { getLastMonth } from 'state/utils'

import types from './constants'

export const initialState = {
  dataReceived: false,
  entries: [],
  start: getLastMonth(),
  end: undefined,
  timeframe: timeframeConstants.DAY,
  skip: undefined,
}

export function balanceReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.UPDATE_BALANCE: {
      return {
        ...state,
        dataReceived: true,
        entries: payload,
      }
    }
    case types.SET_PARAMS:
      return {
        ...initialState,
        ...payload,
      }
    case types.FETCH_FAIL:
      return state
    case types.REFRESH:
      return {
        ...initialState,
        start: state.start,
        end: state.end,
        timeframe: state.timeframe,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default balanceReducer
