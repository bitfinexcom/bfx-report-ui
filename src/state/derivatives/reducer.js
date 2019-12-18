// https://docs.bitfinex.com/v2/reference#rest-public-status
import _get from 'lodash/get'

import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  addPair, basePairState, fetch, fetchFail, removePair, setPairs,
} from 'state/reducers.helper'
import { formatPair, mapPair } from 'state/symbols/utils'

import types from './constants'

const initialState = {
  ...basePairState,
}

export function derivativesReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH_DERIVATIVES:
      return fetch(state)
    case types.UPDATE_DERIVATIVES: {
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
          key,
          timestamp,
          price,
          priceSpot,
          fundBal,
          fundingAccrued,
          fundingStep,
        } = entry

        return {
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
        entries,
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
    case types.REFRESH:
    case queryTypes.SET_TIME_RANGE:
      return {
        ...initialState,
        targetPairs: state.targetPairs,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default derivativesReducer
