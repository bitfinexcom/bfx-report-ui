import _map from 'lodash/map'
import _isNil from 'lodash/isNil'
import _sortBy from 'lodash/sortBy'

import authTypes from 'state/auth/constants'
import queryTypes from 'state/query/constants'
import timeRangeTypes from 'state/timeRange/constants'
import {
  basePairState,
  fetch,
  fetchFail,
  setTimeRange,
} from 'state/reducers.helper'
import { formatPair, mapPair } from 'state/symbols/utils'

import types from './constants'

const initialState = {
  ...basePairState,
  targetPair: mapPair('BTC:USD'),
}

const TYPE = queryTypes.MENU_WEIGHTED_AVERAGES

export function weightedAveragesReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH_WEIGHTED_AVERAGES:
      return fetch(state)
    case types.UPDATE_WEIGHTED_AVERAGES: {
      if (_isNil(payload?.data)) {
        return {
          ...state,
          dataReceived: true,
          pageLoading: false,
          nextPage: false,
        }
      }
      const { data } = payload
      const { res, nextPage } = data
      const entries = _map(res, (entry) => {
        const {
          symbol,
          buyingWeightedPrice,
          buyingAmount,
          sellingWeightedPrice,
          sellingAmount,
          cumulativeAmount,
          firstTradeMts,
          lastTradeMts,
        } = entry

        return {
          pair: mapPair(formatPair(symbol)),
          buyingWeightedPrice,
          buyingAmount,
          sellingWeightedPrice,
          sellingAmount,
          cumulativeAmount,
          firstTradeMts,
          lastTradeMts,
        }
      })

      return {
        ...state,
        dataReceived: true,
        pageLoading: false,
        nextPage,
        entries: _sortBy(entries, (o) => o.pair),
      }
    }
    case types.FETCH_FAIL:
      return fetchFail(state)
    case types.SET_PAIR:
      return {
        ...initialState,
        targetPair: payload,
      }
    case timeRangeTypes.SET_TIME_RANGE:
      return setTimeRange(TYPE, state, initialState)
    case types.REFRESH:
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

export default weightedAveragesReducer
