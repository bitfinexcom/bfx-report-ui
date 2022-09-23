import _map from 'lodash/map'

import authTypes from 'state/auth/constants'
import timeRangeTypes from 'state/timeRange/constants'
import { baseSymbolState } from 'state/reducers.helper'
import timeframeConstants from 'ui/TimeFrameSelector/constants'
import reportTypeConstants from 'ui/ReportTypeSelector/constants'

import types from './constants'

export const initialState = {
  ...baseSymbolState,
  currentFetchParams: {},
  dataReceived: false,
  entries: [],
  isTradingFees: true,
  isFundingFees: false,
  pageLoading: false,
  reportType: reportTypeConstants.TRADING_FEES,
  timeframe: timeframeConstants.DAY,
}

export function feesReportReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH_FEES_REPORT:
      return {
        ...initialState,
        pageLoading: true,
        currentFetchParams: {
          targetSymbols: state.targetSymbols,
          timeframe: state.timeframe,
          isTradingFees: state.isTradingFees,
          isFundingFees: state.isFundingFees,
        },
        timeframe: state.timeframe,
        reportType: state.reportType,
        isTradingFees: state.isTradingFees,
        isFundingFees: state.isFundingFees,
        targetSymbols: state.targetSymbols,
      }
    case types.UPDATE_FEES_REPORT: {
      return {
        ...state,
        dataReceived: true,
        pageLoading: false,
        entries: _map(payload, entry => ({
          ...entry,
          USD: Math.abs(entry.USD),
        })),
      }
    }
    case types.SET_PARAMS:
      return {
        ...state,
        ...payload,
      }
    case types.SET_REPORT_TYPE:
      return {
        ...state,
        reportType: payload,
      }
    case types.FETCH_FAIL:
      return {
        ...state,
        dataReceived: true,
        pageLoading: false,
      }
    case types.ADD_SYMBOL:
      return state.targetSymbols.includes(payload)
        ? state
        : {
          ...initialState,
          targetSymbols: [...state.targetSymbols, payload],
        }
    case types.REMOVE_SYMBOL:
      return (state.targetSymbols.includes(payload))
        ? {
          ...initialState,
          targetSymbols: state.targetSymbols.filter(symbol => symbol !== payload),
        }
        : state
    case types.CLEAR_SYMBOLS:
      return {
        ...initialState,
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
    case types.SET_SYMBOLS:
      return {
        ...initialState,
        targetSymbols: payload,
      }
    case types.CLEAR_PAIRS:
      return {
        ...state,
        targetPairs: [],
      }
    case types.REFRESH:
    case timeRangeTypes.SET_TIME_RANGE:
      return {
        ...initialState,
        timeframe: state.timeframe,
        targetPairs: state.targetPairs,
        reportType: state.reportType,
        isTradingFees: state.isTradingFees,
        isFundingFees: state.isFundingFees,
        targetSymbols: state.targetSymbols,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default feesReportReducer
