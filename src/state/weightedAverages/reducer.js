// https://docs.bitfinex.com/v2/reference#rest-public-status
import _get from 'lodash/get'
import _sortBy from 'lodash/sortBy'

import authTypes from 'state/auth/constants'
import {
  addPair,
  basePairState,
  clearPairs,
  fetch,
  fetchFail,
  removePair,
  setPairs,
} from 'state/reducers.helper'
import { formatPair, mapPair } from 'state/symbols/utils'

import types from './constants'

const initialState = {
  ...basePairState,
}

export function weightedAveragesReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH_WEIGHTED_AVERAGES:
      return fetch(state)
    case types.UPDATE_WEIGHTED_AVERAGES: {
      if (!_get(payload, ['data', 'res'])) {
        return {
          ...state,
          dataReceived: true,
          pageLoading: false,
        }
      }
      const { data: { res } } = payload
      const entries = res.map((entry) => {
        const {
          clampMin,
          clampMax,
          key,
          timestamp,
          price,
          priceSpot,
          fundBal,
          fundingAccrued,
          fundingStep,
        } = entry

        return {
          clampMin,
          clampMax,
          pair: mapPair(formatPair(key)),
          timestamp,
          price,
          priceSpot,
          fundBal,
          fundingAccrued,
          fundingStep,
        }
      })

      return {
        ...state,
        dataReceived: true,
        pageLoading: false,
        entries: _sortBy(entries, (o) => o.pair),
      }
    }
    case types.FETCH_FAIL:
      return fetchFail(state)
    case types.ADD_PAIR:
      return addPair(state, payload, initialState)
    case types.REMOVE_PAIR:
      return removePair(state, payload, initialState)
    case types.SET_PAIRS:
      return setPairs(state, payload, initialState)
    case types.CLEAR_PAIRS:
      return clearPairs(state, initialState)
    case types.REFRESH:
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default weightedAveragesReducer
