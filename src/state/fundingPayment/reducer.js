// https://docs.bitfinex.com/v2/reference#ledgers
import _get from 'lodash/get'

import baseTypes from 'state/base/constants'
import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  addSymbol,
  baseSymbolState,
  fetchFail,
  fetchNext,
  fetchPrev,
  getPageOffset,
  jumpPage,
  mapDescription,
  removeSymbol,
  setQueryLimit,
  setSymbols,
  setTimeRange,
} from 'state/reducers.helper'
import { mapSymbol } from 'state/symbols/utils'

import types from './constants'

const initialState = {
  ...baseSymbolState,
}

const TYPE = queryTypes.MENU_FPAYMENT

export function fpaymentReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.UPDATE_FPAYMENT: {
      if (!_get(payload, ['data', 'res'])) {
        return {
          ...state,
          dataReceived: true,
        }
      }
      const { data, limit, pageSize } = payload
      const { res = [], nextPage } = data
      const { existingCoins } = state
      const updateCoins = [...existingCoins]
      let smallestMts
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
        // log smallest mts
        if (nextPage === false && (!smallestMts || smallestMts > mts)) {
          smallestMts = mts
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
      const [offset, pageOffset] = getPageOffset(state, entries, limit, pageSize)
      return {
        ...state,
        currentEntriesSize: entries.length,
        dataReceived: true,
        entries: [...state.entries, ...entries],
        existingCoins: updateCoins.sort(),
        smallestMts: nextPage !== false ? nextPage : smallestMts - 1,
        offset,
        pageOffset,
        pageLoading: false,
        nextPage,
      }
    }
    case types.FETCH_FAIL:
      return fetchFail(state)
    case types.FETCH_NEXT_FPAYMENT:
      return fetchNext(TYPE, state, payload)
    case types.FETCH_PREV_FPAYMENT:
      return fetchPrev(TYPE, state, payload)
    case types.JUMP_FPAYMENT_PAGE:
      return jumpPage(TYPE, state, payload)
    case types.ADD_SYMBOL:
      return addSymbol(state, payload, initialState)
    case types.REMOVE_SYMBOL:
      return removeSymbol(state, payload, initialState)
    case types.SET_SYMBOLS:
      return setSymbols(state, payload, initialState)
    case types.REFRESH:
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
