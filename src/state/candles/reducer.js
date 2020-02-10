import authTypes from 'state/auth/constants'
import { fetch, fetchFail } from 'state/reducers.helper'
import { getLastMonth } from 'state/utils'
import { mapSymbol } from 'state/symbols/utils'

import types from './constants'

const initialParams = {
  start: getLastMonth(),
  end: undefined,
  timeFrame: '1D',
  pair: 'BTC:USD',
}

export const initialState = {
  dataReceived: false,
  pageLoading: false,
  candles: [],
  trades: [],
  ...initialParams,
  currentFetchParams: initialParams,
}

export function candlesReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH:
      return fetch(state)
    case types.UPDATE: {
      const { candles, trades } = payload
      return {
        ...state,
        dataReceived: true,
        pageLoading: false,
        candles: candles.map((candle) => {
          const {
            time,
            high,
            low,
            open,
            close,
            volume,
          } = candle

          return {
            time: time / 1000,
            high,
            low,
            open,
            close,
            volume,
          }
        }),
        trades: trades.res.map((trade) => {
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
        }),
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
        timeFrame: state.timeframe,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default candlesReducer
