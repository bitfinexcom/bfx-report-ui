// https://docs.bitfinex.com/v2/reference#rest-auth-funding-offers-hist
import _get from 'lodash/get'

import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  addSymbol,
  baseSymbolState,
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
}

const TYPE = queryTypes.MENU_FOFFER

export function fundingOfferHistoryReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH_FOFFER:
      return fetch(state)
    case types.UPDATE_FOFFER: {
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
          amountExecuted,
          amountOrig,
          flags,
          hidden,
          id,
          mtsCreate,
          mtsUpdate,
          notify,
          period,
          rate,
          rateReal,
          renew,
          status,
          symbol,
          type,
        } = entry
        const currentSymbol = mapSymbol(symbol.slice(1))
        // save new symbol to updateCoins list
        if (updateCoins.indexOf(currentSymbol) === -1) {
          updateCoins.push(currentSymbol)
        }
        return {
          id,
          symbol: currentSymbol,
          mtsCreate,
          mtsUpdate,
          amount,
          amountExecuted,
          amountOrig,
          type,
          flags,
          status,
          rate,
          period,
          notify,
          hidden,
          renew,
          rateReal,
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

export default fundingOfferHistoryReducer
