// https://docs.bitfinex.com/v2/reference#rest-auth-trades-hist
import { formatInternalPair, formatSymbolToPair } from 'state/symbols/utils'
import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'

import types from './constants'

const initialState = {
  dataReceived: false,
  entries: [],
  existingPairs: [],
  smallestMts: 0,
  offset: 0, // end of current offset
  pageOffset: 0, // start of current page
  pageLoading: false,
  targetPair: '',
  nextPage: false,
}

const LIMIT = queryTypes.DEFAULT_TRADES_QUERY_LIMIT
const PAGE_SIZE = queryTypes.DEFAULT_TRADES_PAGE_SIZE

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
        smallestMts: nextPage !== false ? nextPage : smallestMts,
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
      return (state.entries.length - LIMIT >= state.offset)
        ? {
          ...state,
          offset: state.offset + LIMIT,
          pageOffset: 0,
        } : {
          ...state,
          pageLoading: true,
        }
    case types.FETCH_PREV_TRADES:
      return {
        ...state,
        offset: state.offset >= LIMIT ? state.offset - LIMIT : 0,
        pageOffset: 0,
      }
    case types.JUMP_TRADES_PAGE: {
      const page = payload
      const totalOffset = (page - 1) * PAGE_SIZE
      const currentOffset = Math.floor(totalOffset / LIMIT) * LIMIT
      if (totalOffset < LIMIT) {
        const baseOffset = Math.ceil(page / LIMIT * PAGE_SIZE) * LIMIT
        return {
          ...state,
          offset: state.offset < baseOffset ? state.offset : baseOffset,
          pageOffset: totalOffset - currentOffset,
        }
      }
      return {
        ...state,
        offset: currentOffset + LIMIT,
        pageOffset: totalOffset - currentOffset,
      }
    }
    case types.SET_PAIR:
      return {
        ...initialState,
        targetPair: payload,
        existingPairs: state.existingPairs,
      }
    // existingPairs should be re-calc in new time range
    case types.REFRESH:
    case queryTypes.SET_TIME_RANGE:
      return {
        ...initialState,
        targetPair: state.targetPair,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default tradesReducer
