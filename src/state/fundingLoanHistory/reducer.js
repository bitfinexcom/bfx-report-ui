// https://docs.bitfinex.com/v2/reference#rest-auth-funding-loans-hist
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

const TYPE = queryTypes.MENU_FLOAN

export function fundingLoanHistoryReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.UPDATE_FLOAN: {
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
          flags,
          hidden,
          id,
          mtsCreate,
          mtsLastPayout,
          mtsOpening,
          mtsUpdate,
          noClose,
          notify,
          period,
          rate,
          rateReal,
          renew,
          side,
          status,
          symbol,
        } = entry
        const currentSymbol = mapSymbol(symbol.slice(1))
        // save new symbol to updateCoins list
        if (updateCoins.indexOf(currentSymbol) === -1) {
          updateCoins.push(currentSymbol)
        }
        return {
          id,
          symbol: currentSymbol,
          side,
          mtsCreate,
          mtsUpdate,
          amount,
          flags,
          status,
          rate,
          period,
          mtsOpening,
          mtsLastPayout,
          notify,
          hidden,
          renew,
          rateReal,
          noClose,
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

export default fundingLoanHistoryReducer
