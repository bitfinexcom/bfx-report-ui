import authTypes from 'state/auth/constants'
import timeframeConstants from 'ui/TimeFrameSelector/constants'
import { getLastMonth } from 'state/utils'

import types from './constants'

export const initialState = {
  dataReceived: false,
  pageLoading: false,
  currentFetchParams: {},
  entries: [],
  targetSymbols: [],
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
          targetSymbols: state.targetSymbols,
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
    case types.ADD_SYMBOL:
      return {
        ...state,
        targetSymbols: [...state.targetSymbols, payload],
      }
    case types.REMOVE_SYMBOL:
      return {
        ...state,
        targetSymbols: state.targetSymbols.filter(symbol => symbol !== payload),
      }
    case types.SET_SYMBOLS:
      return {
        ...state,
        targetSymbols: payload,
      }
    case types.REFRESH:
      return {
        ...initialState,
        start: state.start,
        end: state.end,
        timeframe: state.timeframe,
        targetSymbols: state.targetSymbols,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default loanReportReducer
