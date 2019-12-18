// data format https://github.com/bitfinexcom/bfx-api-node-models/blob/master/lib/position_hist.js
import _get from 'lodash/get'

import { formatPair, mapPair } from 'state/symbols/utils'
import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  addPair,
  basePairState,
  fetch,
  fetchFail,
  refresh,
  removePair,
  setPairs,
  setTimeRange,
} from 'state/reducers.helper'

import types from './constants'

const initialState = {
  ...basePairState,
}

const TYPE = queryTypes.MENU_POSITIONS

export function positionsReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH_POSITIONS:
      return fetch(state)
    case types.UPDATE_POSITIONS: {
      const res = _get(payload, ['data', 'res'])
      if (!res) {
        return {
          ...state,
          dataReceived: true,
          pageLoading: false,
        }
      }

      const { existingPairs } = state
      const updatePairs = [...existingPairs]
      const entries = res.map((entry) => {
        const {
          amount,
          basePrice,
          id,
          leverage,
          marginFunding,
          marginFundingType,
          mtsCreate,
          mtsUpdate,
          status,
          symbol,
        } = entry
        const formattedPair = mapPair(formatPair(symbol))
        // save new pair to updatePairs list
        if (updatePairs.indexOf(formattedPair) === -1) {
          updatePairs.push(formattedPair)
        }
        return {
          id,
          pair: formattedPair,
          amount,
          basePrice,
          leverage,
          marginFunding,
          marginFundingType,
          mtsCreate,
          mtsUpdate,
          status,
        }
      })
      return {
        ...state,
        dataReceived: true,
        pageLoading: false,
        entries: [...state.entries, ...entries],
        existingPairs: updatePairs.sort(),
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

export default positionsReducer
