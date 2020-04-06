// https://docs.bitfinex.com/v2/reference#TICKERS-history
import _get from 'lodash/get'

import { formatPair, mapPair } from 'state/symbols/utils'
import authTypes from 'state/auth/constants'
import timeRangeTypes from 'state/timeRange/constants'
import queryTypes from 'state/query/constants'
import {
  addPair,
  basePairState,
  fetch,
  fetchFail,
  refresh,
  removePair,
  setPairs,
  setTimeRange,
} from 'state/reducers.helper'

import types from './constants'

const initialState = {
  ...basePairState,
  targetPairs: [mapPair('BTC:USD')],
}

const TYPE = queryTypes.MENU_TICKERS

export function TickersReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH_TICKERS:
      return fetch(state)
    case types.UPDATE_TICKERS: {
      const res = _get(payload, ['data', 'res'])
      if (!res) {
        return {
          ...state,
          dataReceived: true,
          pageLoading: false,
        }
      }
      const { existingPairs } = state
      const updatePairs = [...existingPairs]
      const entries = res.map((entry) => {
        const {
          ask,
          bid,
          mtsUpdate,
          symbol,
        } = entry
        const formattedPair = mapPair(formatPair(symbol))
        // save new pair to updatePairs list
        if (updatePairs.indexOf(formattedPair) === -1) {
          updatePairs.push(formattedPair)
        }
        return {
          ask,
          bid,
          mtsUpdate,
          pair: formattedPair,
        }
      })
      return {
        ...state,
        dataReceived: true,
        pageLoading: false,
        entries: [...state.entries, ...entries],
        existingPairs: updatePairs.sort(),
      }
    }
    case types.FETCH_FAIL:
      return fetchFail(state)
    case types.ADD_PAIR:
      return addPair(state, payload, initialState)
    case types.REMOVE_PAIR:
      return removePair(state, payload, initialState)
    case types.SET_PAIRS:
      return setPairs(state, payload, initialState)
    case types.REFRESH:
      return refresh(TYPE, state, initialState)
    case timeRangeTypes.SET_TIME_RANGE:
      return setTimeRange(TYPE, state, initialState)
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default TickersReducer
