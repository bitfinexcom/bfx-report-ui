// https://docs.bitfinex.com/v2/reference#movements
import _get from 'lodash/get'

import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  addSymbol,
  baseSymbolState,
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
}

const TYPE = queryTypes.MENU_MOVEMENTS

export function movementsReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.UPDATE_MOVEMENTS: {
      const res = _get(payload, ['data', 'res'])
      if (!res) {
        return {
          ...state,
          dataReceived: true,
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
        }
      })
      return {
        ...state,
        dataReceived: true,
        entries: [...state.entries, ...entries],
        existingCoins: updateCoins.sort(),
        pageLoading: false,
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
    case queryTypes.SET_TIME_RANGE:
      return setTimeRange(TYPE, state, initialState)
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default movementsReducer
