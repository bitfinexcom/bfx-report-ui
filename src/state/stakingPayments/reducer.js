// https://docs.bitfinex.com/reference#rest-auth-ledgers

import authTypes from 'state/auth/constants'
import timeRangeTypes from 'state/timeRange/constants'
import queryTypes from 'state/query/constants'
import { updateLedgers } from 'state/ledgers/utils'
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

import types from './constants'

const initialState = {
  ...baseSymbolState,
}

const TYPE = queryTypes.MENU_SPAYMENTS

export function spaymentsReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.FETCH_DATA:
      return fetch(state)
    case types.UPDATE_DATA:
      return updateLedgers(state, payload)
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
    case timeRangeTypes.SET_TIME_RANGE:
      return setTimeRange(TYPE, state, initialState)
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default spaymentsReducer
