import authTypes from 'state/auth/constants'
import timeframeConstants from 'ui/TimeFrameSelector/constants'
import { fetchFail } from 'state/reducers.helper'
import timeRangeTypes from 'state/timeRange/constants'
import unrealizedProfitConstants from 'ui/UnrealizedProfitSelector/constants'

import types from './constants'

export const initialState = {
  currentFetchParams: {},
  dataReceived: false,
  entries: [],
  pageLoading: false,
  timeframe: timeframeConstants.DAY,
  isUnrealizedProfitExcluded: unrealizedProfitConstants.FALSE,
}

export function balanceReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH_BALANCE:
      return {
        ...initialState,
        pageLoading: true,
        currentFetchParams: {
          timeframe: state.timeframe,
          isUnrealizedProfitExcluded: state.isUnrealizedProfitExcluded,
        },
        timeframe: state.timeframe,
        isUnrealizedProfitExcluded: state.isUnrealizedProfitExcluded,
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
    case timeRangeTypes.SET_TIME_RANGE:
      return {
        ...initialState,
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
