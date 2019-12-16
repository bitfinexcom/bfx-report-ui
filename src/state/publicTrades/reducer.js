// https://docs.bitfinex.com/v2/reference#rest-public-trades
import _get from 'lodash/get'

import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  baseState,
  fetchFail,
} from 'state/reducers.helper'
import { mapPair } from 'state/symbols/utils'

import types from './constants'

const initialState = {
  ...baseState,
  targetPair: mapPair('BTC:USD'),
}

export function publicTradesReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.UPDATE_PUBLIC_TRADES: {
      const res = _get(payload, ['data', 'res'])
      if (!res) {
        return {
          ...state,
          dataReceived: true,
        }
      }
      const entries = res.map((entry) => {
        const {
          amount,
          price,
          id,
          mts,
        } = entry
        return {
          id,
          mts,
          amount,
          price,
          type: parseFloat(amount) > 0 ? 'BUY' : 'SELL',
        }
      })
      return {
        ...state,
        currentEntriesSize: entries.length,
        dataReceived: true,
        entries: [...state.entries, ...entries],
        pageLoading: false,
      }
    }
    case types.FETCH_FAIL:
      return fetchFail(state)
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
