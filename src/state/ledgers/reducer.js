// https://docs.bitfinex.com/v2/reference#ledgers
import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  addSymbol,
  baseSymbolState,
  fetchFail,
  fetchNext,
  fetchPrev,
  jumpPage,
  removeSymbol,
  setSymbols,
  setTimeRange,
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
      if (!payload) {
        return {
          ...state,
          dataReceived: true,
        }
      }
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
        currentEntriesSize: entries.length,
        dataReceived: true,
        entries: [...state.entries, ...entries],
        existingCoins: updateCoins.sort(),
        smallestMts: nextPage !== false ? nextPage : smallestMts - 1,
        offset: state.offset + entries.length,
        pageOffset: 0,
        pageLoading: false,
        nextPage,
      }
    }
    case types.FETCH_FAIL:
      return fetchFail(state)
    case types.FETCH_NEXT_LEDGERS:
      return fetchNext(TYPE, state)
    case types.FETCH_PREV_LEDGERS:
      return fetchPrev(TYPE, state)
    case types.JUMP_LEDGERS_PAGE:
      return jumpPage(TYPE, state, payload)
    case types.ADD_SYMBOL:
      return addSymbol(state, payload, initialState)
    case types.REMOVE_SYMBOL:
      return removeSymbol(state, payload, initialState)
    case types.SET_SYMBOLS:
      return setSymbols(state, payload, initialState)
    case types.REFRESH:
    case queryTypes.SET_TIME_RANGE:
      return setTimeRange(TYPE, state, initialState)
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default ledgersReducer
