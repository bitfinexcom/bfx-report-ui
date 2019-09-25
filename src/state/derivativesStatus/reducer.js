// https://docs.bitfinex.com/v2/reference#rest-public-status
import _get from 'lodash/get'

import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  addPair, basePairState, fetchFail, removePair, setPairs,
} from 'state/reducers.helper'
import { formatSymbolToPair } from 'state/symbols/utils'

import types from './constants'

const initialState = {
  ...basePairState,
}

export function derivativesStatusReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.UPDATE_DERIVATIVES_STATUS: {
      if (!_get(payload, ['data', 'res'])) {
        return {
          ...state,
          dataReceived: true,
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
          key: formatSymbolToPair(key),
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
        entries,
        pageLoading: false,
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
        targetPair: state.targetPair,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default derivativesStatusReducer
