// https://docs.bitfinex.com/v2/reference#ledgers
import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  baseSymbolState,
  fetchNext,
  fetchPrev,
  jumpPage,
} from 'state/reducers.helper'

import types from './constants'

const initialState = {
  ...baseSymbolState,
}

const TYPE = queryTypes.MENU_LEDGERS

export function ledgersReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.UPDATE_LEDGERS: {
      const { res, nextPage } = payload
      const { existingCoins } = state
      const updateCoins = [...existingCoins]
      let smallestMts
      const entries = res.map((entry) => {
        const {
          amount,
          balance,
          currency,
          description,
          id,
          mts,
          wallet,
        } = entry
        // save new symbol to updateCoins list
        if (updateCoins.indexOf(currency) === -1) {
          updateCoins.push(currency)
        }
        // log smallest mts
        if (nextPage === false
          && (!smallestMts || smallestMts > mts)
        ) {
          smallestMts = mts
        }
        return {
          id,
          currency,
          mts,
          amount,
          balance,
          description,
          wallet,
        }
      })
      return {
        ...state,
        entries: [...state.entries, ...entries],
        existingCoins: updateCoins.sort(),
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
    case types.FETCH_NEXT_LEDGERS:
      return fetchNext(TYPE, state)
    case types.FETCH_PREV_LEDGERS:
      return fetchPrev(TYPE, state)
    case types.JUMP_LEDGERS_PAGE:
      return jumpPage(TYPE, state, payload)
    case types.ADD_SYMBOL:
      return state.targetSymbols.includes(payload)
        ? state
        : {
          ...initialState,
          targetSymbols: [...state.targetSymbols, payload],
          existingCoins: state.existingCoins,
        }
    case types.REMOVE_SYMBOL:
      return (state.targetSymbols.includes(payload))
        ? {
          ...initialState,
          targetSymbols: state.targetSymbols.filter(symbol => symbol !== payload),
          existingCoins: state.existingCoins,
        }
        : state
    case types.SET_SYMBOLS:
      return {
        ...initialState,
        targetSymbols: payload,
        existingCoins: state.existingCoins,
      }
    // existingCoins should be re-calc in new time range
    case types.REFRESH:
    case queryTypes.SET_TIME_RANGE:
      return {
        ...initialState,
        targetSymbols: state.targetSymbols,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default ledgersReducer
