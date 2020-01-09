// https://docs.bitfinex.com/v2/reference#ledgers

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

import types from './constants'
import { updateLedgers } from './utils'

const initialState = {
  ...baseSymbolState,
}

const TYPE = queryTypes.MENU_LEDGERS

export function ledgersReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.FETCH_LEDGERS:
      return fetch(state)
    case types.UPDATE_LEDGERS:
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
