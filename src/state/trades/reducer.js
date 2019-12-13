// https://docs.bitfinex.com/v2/reference#rest-auth-trades-hist
import _get from 'lodash/get'

import { formatPair, mapSymbol, mapPair } from 'state/symbols/utils'
import baseTypes from 'state/base/constants'
import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  addPair,
  basePairState,
  fetchFail,
  fetchNext,
  fetchPrev,
  jumpPage,
  removePair,
  setPairs,
  setQueryLimit,
  setTimeRange,
} from 'state/reducers.helper'

import types from './constants'

const initialState = {
  ...basePairState,
}

const TYPE = queryTypes.MENU_TRADES

export function tradesReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.UPDATE_TRADES: {
      if (!_get(payload, ['data', 'res'])) {
        return {
          ...state,
          dataReceived: true,
        }
      }
      const { data } = payload
      const { res } = data
      const { existingPairs } = state
      const updatePairs = [...existingPairs]
      const entries = res.map((entry) => {
        const {
          execAmount,
          execPrice,
          fee,
          feeCurrency,
          id,
          symbol,
          maker,
          mtsCreate,
          orderID,
          orderPrice,
          orderType,
        } = entry
        const formattedPair = mapPair(formatPair(symbol))
        // save new pair to updatePairs list
        if (updatePairs.indexOf(formattedPair) === -1) {
          updatePairs.push(formattedPair)
        }
        return {
          id,
          pair: formattedPair,
          mtsCreate,
          orderID,
          execAmount,
          execPrice,
          orderType,
          orderPrice,
          maker,
          fee,
          feeCurrency: mapSymbol(feeCurrency),
        }
      })
      return {
        ...state,
        currentEntriesSize: entries.length,
        dataReceived: true,
        entries: [...state.entries, ...entries],
        existingPairs: updatePairs.sort(),
        pageLoading: false,
      }
    }
    case types.FETCH_FAIL:
      return fetchFail(state)
    case types.FETCH_NEXT_TRADES:
      return {
        ...state,
        pageLoading: true,
      }
    case types.ADD_PAIR:
      return addPair(state, payload, initialState)
    case types.REMOVE_PAIR:
      return removePair(state, payload, initialState)
    case types.SET_PAIRS:
      return setPairs(state, payload, initialState)
    case types.REFRESH:
    case baseTypes.SET_QUERY_LIMIT:
      return setQueryLimit(TYPE, state, initialState)
    case queryTypes.SET_TIME_RANGE:
      return setTimeRange(TYPE, state, initialState)
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default tradesReducer
