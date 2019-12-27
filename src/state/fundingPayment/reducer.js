// https://docs.bitfinex.com/v2/reference#ledgers
import _get from 'lodash/get'

import baseTypes from 'state/base/constants'
import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  addSymbol,
  baseSymbolState,
  fetchFail,
  refresh,
  removeSymbol,
  setQueryLimit,
  setSymbols,
  setTimeRange,
} from 'state/reducers.helper'
import { mapSymbol, mapDescription } from 'state/symbols/utils'

import types from './constants'

const initialState = {
  ...baseSymbolState,
}

const TYPE = queryTypes.MENU_FPAYMENT

export function fpaymentReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.UPDATE_FPAYMENT: {
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
          balance,
          balanceUsd,
          currency,
          description,
          id,
          mts,
          wallet,
        } = entry
        const mappedCurrency = mapSymbol(currency)
        // save new symbol to updateCoins list
        if (updateCoins.indexOf(mappedCurrency) === -1) {
          updateCoins.push(mappedCurrency)
        }
        return {
          id,
          currency: mappedCurrency,
          mts,
          amount,
          amountUsd,
          balance,
          balanceUsd,
          description: mapDescription(description),
          wallet,
        }
      })
      return {
        ...state,
        currentEntriesSize: entries.length,
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

export default fpaymentReducer
