import authTypes from 'state/auth/constants'
import timeRangeTypes from 'state/timeRange/constants'
import timeframeConstants from 'ui/TimeFrameSelector/constants'

import types from './constants'

export const initialState = {
  dataReceived: false,
  pageLoading: false,
  currentFetchParams: {},
  entries: [],
  targetPairs: [],
  timeframe: timeframeConstants.DAY,
}

export function tradedVolumeReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH_TRADED_VOLUME:
      return {
        ...initialState,
        pageLoading: true,
        currentFetchParams: {
          targetPairs: state.targetPairs,
          timeframe: state.timeframe,
        },
        targetPairs: state.targetPairs,
        timeframe: state.timeframe,
      }
    case types.UPDATE_TRADED_VOLUME: {
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
      return {
        ...state,
        dataReceived: true,
        pageLoading: false,
      }
    case types.ADD_PAIR:
      return {
        ...state,
        targetPairs: [...state.targetPairs, payload],
      }
    case types.REMOVE_PAIR:
      return {
        ...state,
        targetPairs: state.targetPairs.filter(pair => pair !== payload),
      }
    case types.SET_PAIRS:
      return {
        ...state,
        targetPairs: payload,
      }
    case types.REFRESH:
    case timeRangeTypes.SET_TIME_RANGE:
      return {
        ...initialState,
        timeframe: state.timeframe,
        targetPairs: state.targetPairs,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default tradedVolumeReducer
