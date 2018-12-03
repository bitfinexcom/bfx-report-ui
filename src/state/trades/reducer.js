// https://docs.bitfinex.com/v2/reference#rest-auth-trades-hist
import { formatInternalPair, formatSymbolToPair } from 'state/symbols/utils'
import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  fetchNext,
  fetchPrev,
  jumpPage,
} from 'state/reducers.helper'

import types from './constants'

const initialState = {
  dataReceived: false,
  entries: [],
  existingPairs: [],
  smallestMts: 0,
  offset: 0, // end of current offset
  pageOffset: 0, // start of current page
  pageLoading: false,
  targetPairs: [],
  nextPage: false,
}

const TYPE = queryTypes.MENU_TRADES

export function tradesReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.UPDATE_TRADES: {
      const { res, nextPage } = payload
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
      return {
        ...state,
        entries: [...state.entries, ...entries],
        existingPairs: updatePairs.sort(),
        dataReceived: true,
        smallestMts: nextPage !== false ? nextPage : smallestMts - 1,
        offset: state.offset + entries.length,
        pageOffset: 0,
        pageLoading: false,
        nextPage,
      }
    }
    case types.FETCH_FAIL:
      return {
        ...state,
        pageLoading: false,
      }
    case types.FETCH_NEXT_TRADES:
      return fetchNext(TYPE, state)
    case types.FETCH_PREV_TRADES:
      return fetchPrev(TYPE, state)
    case types.JUMP_TRADES_PAGE:
      return jumpPage(TYPE, state, payload)
    case types.ADD_PAIR:
      return state.targetPairs.includes(payload)
        ? state
        : {
          ...initialState,
          targetPairs: [...state.targetPairs, payload],
          existingPairs: state.existingPairs,
        }
    case types.REMOVE_PAIR:
      return (state.targetPairs.includes(payload))
        ? {
          ...initialState,
          targetPairs: state.targetPairs.filter(pair => pair !== payload),
          existingPairs: state.existingPairs,
        }
        : state
    case types.SET_PAIRS:
      return {
        ...initialState,
        targetPairs: payload,
        existingPairs: state.existingPairs,
      }
    // existingPairs should be re-calc in new time range
    case types.REFRESH:
    case queryTypes.SET_TIME_RANGE:
      return {
        ...initialState,
        targetPairs: state.targetPairs,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default tradesReducer
