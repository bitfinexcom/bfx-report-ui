// https://docs.bitfinex.com/v2/reference#rest-auth-trades-hist
import { formatInternalPair, formatSymbolToPair } from 'state/symbols/utils'
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
      const { data, limit, pageSize } = payload
      const { res, nextPage } = data
      const { existingPairs } = state
      const updatePairs = [...existingPairs]
      let smallestMts
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
        const internalPair = formatInternalPair(symbol)
        // save new pair to updatePairs list
        if (updatePairs.indexOf(internalPair) === -1) {
          updatePairs.push(internalPair)
        }
        // log smallest mts
        if (nextPage === false
          && (!smallestMts || smallestMts > mtsCreate)
        ) {
          smallestMts = mtsCreate
        }
        return {
          id,
          pair: formatSymbolToPair(symbol),
          mtsCreate,
          orderID,
          execAmount,
          execPrice,
          orderType,
          orderPrice,
          maker,
          fee: Math.abs(fee),
          feeCurrency,
        }
      })
      let [offset, pageOffset] = getPageOffset(state, limit, pageSize)
      return {
        ...state,
        currentEntriesSize: entries.length,
        dataReceived: true,
        entries: [...state.entries, ...entries],
        existingPairs: updatePairs.sort(),
        smallestMts: nextPage !== false ? nextPage : smallestMts - 1,
        offset,
        pageOffset,
        pageLoading: false,
        nextPage,
      }
    }
    case types.FETCH_FAIL:
      return fetchFail(state)
    case types.FETCH_NEXT_TRADES:
      return fetchNext(TYPE, state, payload)
    case types.FETCH_PREV_TRADES:
      return fetchPrev(TYPE, state, payload)
    case types.JUMP_TRADES_PAGE:
      return jumpPage(TYPE, state, payload)
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
