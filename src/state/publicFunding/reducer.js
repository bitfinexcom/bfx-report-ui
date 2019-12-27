// https://docs.bitfinex.com/v2/reference#rest-public-trades
import _get from 'lodash/get'

import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  baseState,
  fetchFail,
} from 'state/reducers.helper'

import types from './constants'

const initialState = {
  ...baseState,
  targetSymbol: 'USD',
}

export function publicFundingReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.UPDATE_PUBLIC_FUNDING: {
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
          id,
          mts,
          period,
          rate,
        } = entry
        return {
          id,
          mts,
          amount,
          period,
          rate,
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
    case types.SET_SYMBOL:
      return {
        ...initialState,
        targetSymbol: payload.toUpperCase(),
      }
    case types.REFRESH:
    case queryTypes.SET_TIME_RANGE:
      return {
        ...initialState,
        targetSymbol: state.targetSymbol,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default publicFundingReducer
