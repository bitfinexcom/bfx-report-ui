// https://docs.bitfinex.com/reference#rest-auth-movements
import _get from 'lodash/get'

import authTypes from 'state/auth/constants'
import timeRangeTypes from 'state/timeRange/constants'
import queryTypes from 'state/query/constants'
import {
  addSymbol,
  baseSymbolState,
  clearSymbols,
  fetch,
  fetchFail,
  refresh,
  removeSymbol,
  setSymbols,
  setTimeRange,
} from 'state/reducers.helper'
import { mapSymbol } from 'state/symbols/utils'

import types from './constants'

const initialState = {
  ...baseSymbolState,
  movementInfo: {},
}

const TYPE = queryTypes.MENU_MOVEMENTS

export function movementsReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.FETCH_MOVEMENTS:
      return fetch(state)
    case types.UPDATE_MOVEMENTS: {
      const res = _get(payload, ['data', 'res'])
      if (!res) {
        return {
          ...state,
          dataReceived: true,
          pageLoading: false,
        }
      }
      const { existingCoins } = state
      const updateCoins = [...existingCoins]
      const entries = res.map((entry) => {
        const {
          amount,
          amountUsd,
          currency,
          currencyName,
          destinationAddress,
          fees,
          id,
          mtsStarted,
          mtsUpdated,
          status,
          transactionId,
          note,
        } = entry
        const mappedCurrency = mapSymbol(currency)
        // save new symbol to updateCoins list
        if (updateCoins.indexOf(mappedCurrency) === -1) {
          updateCoins.push(mappedCurrency)
        }
        return {
          id,
          currency: mappedCurrency,
          currencyName,
          mtsStarted,
          mtsUpdated,
          status,
          amount,
          amountUsd,
          fees,
          destinationAddress,
          transactionId,
          note,
        }
      })
      return {
        ...state,
        dataReceived: true,
        pageLoading: false,
        entries: [...state.entries, ...entries],
        existingCoins: updateCoins.sort(),
      }
    }
    case types.SET_EXTRA_INFO: {
      return {
        ...state,
        movementInfo: payload,
      }
    }
    case types.FETCH_FAIL:
      return fetchFail(state)
    case types.ADD_SYMBOL:
      return addSymbol(state, payload, initialState)
    case types.REMOVE_SYMBOL:
      return removeSymbol(state, payload, initialState)
    case types.SET_SYMBOLS:
      return setSymbols(state, payload, initialState)
    case types.REFRESH:
      return refresh(TYPE, state, initialState)
    case types.CLEAR_SYMBOLS:
      return clearSymbols(state, initialState)
    case timeRangeTypes.SET_TIME_RANGE:
      return setTimeRange(TYPE, state, initialState)
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default movementsReducer
