// https://docs.bitfinex.com/v2/reference#movements
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
  existingCoins: [],
  offset: 0, // end of current offset
  pageLoading: false,
  pageOffset: 0, // start of current page
  smallestMts: 0,
  targetSymbols: [],
  nextPage: false,
}

const TYPE = queryTypes.MENU_MOVEMENTS

export function movementsReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.UPDATE_MOVEMENTS: {
      const { res, nextPage } = payload
      const { existingCoins } = state
      const updateCoins = [...existingCoins]
      let smallestMts
      const entries = res.map((entry) => {
        const {
          amount,
          currency,
          currencyName,
          destinationAddress,
          fees,
          id,
          mtsStarted,
          mtsUpdated,
          status,
          transactionId,
        } = entry
        // save new symbol to updateCoins list
        if (updateCoins.indexOf(currency) === -1) {
          updateCoins.push(currency)
        }
        // log smallest mts
        if (nextPage === false
          && (!smallestMts || smallestMts > mtsUpdated)
        ) {
          smallestMts = mtsUpdated
        }
        return {
          id,
          currency,
          currencyName,
          mtsStarted,
          mtsUpdated,
          status,
          amount,
          fees,
          destinationAddress,
          transactionId,
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
    case types.FETCH_NEXT_MOVEMENTS:
      return fetchNext(TYPE, state)
    case types.FETCH_PREV_MOVEMENTS:
      return fetchPrev(TYPE, state)
    case types.JUMP_MOVEMENTS_PAGE:
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

export default movementsReducer
