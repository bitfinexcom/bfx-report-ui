// https://docs.bitfinex.com/v2/reference#rest-public-trades
import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  baseState,
  fetchFail,
  fetchNext,
  fetchPrev,
  getPageOffset,
  jumpPage,
} from 'state/reducers.helper'
import { mapPair } from 'state/symbols/utils'

import types from './constants'

const initialState = {
  ...baseState,
  targetPair: mapPair('BTCUSD'),
}

const TYPE = queryTypes.MENU_PUBLIC_TRADES

export function publicTradesReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.UPDATE_PUBLIC_TRADES: {
      if (!payload) {
        return {
          ...state,
          dataReceived: true,
        }
      }
      const { data, limit, pageSize } = payload
      const { res, nextPage } = data
      let smallestMts
      const entries = res.map((entry) => {
        const {
          amount,
          price,
          id,
          mts,
        } = entry
        // log smallest mts
        if (nextPage === false
          && (!smallestMts || smallestMts > mts)
        ) {
          smallestMts = mts
        }
        return {
          id,
          mts,
          amount,
          price,
          type: parseFloat(amount) > 0 ? 'BUY' : 'SELL',
        }
      })
      const [offset, pageOffset] = getPageOffset(state, entries, limit, pageSize)
      return {
        ...state,
        currentEntriesSize: entries.length,
        dataReceived: true,
        entries: [...state.entries, ...entries],
        smallestMts: nextPage !== false ? nextPage : smallestMts - 1,
        offset,
        pageOffset,
        pageLoading: false,
        nextPage,
      }
    }
    case types.FETCH_FAIL:
      return fetchFail(state)
    case types.FETCH_NEXT_PUBLIC_TRADES:
      return fetchNext(TYPE, state, payload)
    case types.FETCH_PREV_PUBLIC_TRADES:
      return fetchPrev(TYPE, state, payload)
    case types.JUMP_PUBLIC_TRADES_PAGE:
      return jumpPage(TYPE, state, payload)
    case types.SET_PAIR:
      return {
        ...initialState,
        targetPair: payload,
      }
    case types.REFRESH:
    case queryTypes.SET_TIME_RANGE:
      return {
        ...initialState,
        targetPair: state.targetPair,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default publicTradesReducer
