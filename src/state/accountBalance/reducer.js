import authTypes from 'state/auth/constants'
import timeframeConstants from 'ui/TimeframeSelector/constants'
import { getLastMonth } from 'state/utils'
import { fetchFail } from 'state/reducers.helper'

import types from './constants'

const initialOptions = {
  start: getLastMonth(),
  end: undefined,
  timeframe: timeframeConstants.DAY,
}

export const initialState = {
  currentFetchParams: initialOptions,
  dataReceived: false,
  entries: [],
  pageLoading: false,
  ...initialOptions,
}

export function balanceReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH_BALANCE:
      return {
        ...state,
        pageLoading: true,
        currentFetchParams: {
          start: state.start,
          end: state.end,
          timeframe: state.timeframe,
        },
      }
    case types.UPDATE_BALANCE: {
      return {
        ...state,
        dataReceived: true,
        pageLoading: false,
        entries: payload,
      }
    }
    case types.SET_PARAMS:
      return {
        ...state,
        ...payload,
      }
    case types.FETCH_FAIL:
      return fetchFail(state)
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
