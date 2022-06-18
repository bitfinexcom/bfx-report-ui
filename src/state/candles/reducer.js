import authTypes from 'state/auth/constants'
import timeRangeTypes from 'state/timeRange/constants'
import { fetchFail } from 'state/reducers.helper'
import { mapSymbol } from 'state/symbols/utils'

import types from './constants'

const initialParams = {
  timeframe: '1h',
  pair: 'BTC:USD',
}

const initDataState = {
  entries: [],
  isLoading: false,
  nextPage: false,
}

export const initialState = {
  dataReceived: false,
  pageLoading: false,
  chartLoading: false,
  candles: initDataState,
  trades: initDataState,
  ...initialParams,
  currentFetchParams: initialParams,
}

const mapCandles = entries => entries.reverse().map((candle) => {
  const {
    mts,
    high,
    low,
    open,
    close,
    volume,
  } = candle

  return {
    time: mts / 1000,
    high,
    low,
    open,
    close,
    volume,
  }
})

const mapTrades = entries => entries.reverse().map((trade) => {
  const {
    execAmount,
    execPrice,
    fee,
    feeCurrency,
    id,
    mtsCreate,
    orderID,
  } = trade

  return {
    execAmount,
    execPrice,
    fee,
    feeCurrency: mapSymbol(feeCurrency),
    id,
    mtsCreate,
    orderID,

    time: mtsCreate / 1000,
    close: execPrice,
    open: 0,
  }
})

const getUpdatedCandles = (state, data) => {
  if (!data) {
    return state.candles
  }

  const candlesEntries = mapCandles(data.res)

  return {
    entries: [...candlesEntries, ...state.candles.entries],
    isLoading: false,
    nextPage: data.nextPage,
  }
}
const getUpdatedTrades = (state, data) => {
  if (!data) {
    return state.trades
  }

  const tradesEntries = mapTrades(data.res)

  return {
    entries: [...tradesEntries, ...state.trades.entries],
    isLoading: false,
    nextPage: data.nextPage,
  }
}

export function candlesReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH: {
      // subsequent requests for candles/trades (infinite scroll)
      if (payload) {
        return {
          ...state,
          [payload]: {
            ...state[payload],
            isLoading: true,
          },
        }
      }

      return {
        ...state,
        dataReceived: false,
        pageLoading: true,
        currentFetchParams: {
          timeframe: state.timeframe,
          pair: state.pair,
        },
        candles: {
          entries: [],
          isLoading: true,
          nextPage: false,
        },
        trades: {
          entries: [],
          isLoading: true,
          nextPage: false,
        },
      }
    }
    case types.UPDATE: {
      const { candles, trades } = payload

      return {
        ...state,
        dataReceived: true,
        pageLoading: false,
        candles: getUpdatedCandles(state, candles),
        trades: getUpdatedTrades(state, trades),
      }
    }
    case types.LOADING: {
      return {
        ...state,
        chartLoading: payload,
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
        pair: state.pair,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default candlesReducer
