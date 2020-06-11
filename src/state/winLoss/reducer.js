import authTypes from 'state/auth/constants'
import timeRangeTypes from 'state/timeRange/constants'
import timeframeConstants from 'ui/TimeFrameSelector/constants'

import { fetchFail } from 'state/reducers.helper'

import types from './constants'

export const initialState = {
  currentFetchParams: {},
  dataReceived: false,
  pageLoading: false,
  entries: [],
  timeframe: timeframeConstants.DAY,
}

export function winLossReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH_WIN_LOSS:
      return {
        ...initialState,
        pageLoading: true,
        currentFetchParams: {
          timeframe: state.timeframe,
        },
        timeframe: state.timeframe,
      }
    case types.UPDATE_WIN_LOSS: {
      if (!payload) {
        return {
          ...state,
          dataReceived: true,
          pageLoading: false,
        }
      }
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

export default winLossReducer
