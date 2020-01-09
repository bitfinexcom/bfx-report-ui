import authTypes from 'state/auth/constants'
import timeframeConstants from 'ui/TimeframeSelector/constants'
import { getLastMonth } from 'state/utils'

import types from './constants'

export const initialState = {
  dataReceived: false,
  pageLoading: false,
  currentFetchParams: {},
  entries: [],
  targetPairs: [],
  start: getLastMonth(),
  end: undefined,
  timeframe: timeframeConstants.DAY,
}

export function loanReportReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH_LOAN_REPORT:
      return {
        ...state,
        pageLoading: true,
        currentFetchParams: {
          targetPairs: state.targetPairs,
          start: state.start,
          end: state.end,
          timeframe: state.timeframe,
        },
      }
    case types.UPDATE_LOAN_REPORT: {
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
      return {
        ...initialState,
        start: state.start,
        end: state.end,
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

export default loanReportReducer
