// data format https://github.com/bitfinexcom/bfx-api-node-models/blob/master/lib/position_hist.js
import _get from 'lodash/get'

import { formatPair, mapPair } from 'state/symbols/utils'
import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  basePairState,
  fetchFail,
  refresh,
} from 'state/reducers.helper'

import types from './constants'

const initialState = {
  ...basePairState,
}

const TYPE = queryTypes.MENU_POSITIONS_ACTIVE

export function positionsActiveReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.UPDATE_APOSITIONS: {
      const res = _get(payload, ['data', 'res'])
      if (!res) {
        return {
          ...state,
          dataReceived: true,
        }
      }
      const { existingPairs } = state
      const updatePairs = [...existingPairs]
      const entries = res.map((entry) => {
        const {
          amount,
          basePrice,
          collateral,
          id,
          leverage,
          marginFunding,
          marginFundingType,
          meta,
          mtsCreate,
          mtsUpdate,
          pl, // Profit & Loss
          plPerc, // Profit & Loss Percentage
          liquidationPrice, // Liquidation price
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
          collateral,
          leverage,
          marginFunding,
          marginFundingType,
          meta,
          mtsCreate,
          mtsUpdate,
          pl,
          plPerc,
          liquidationPrice,
          status,
        }
      })
      return {
        ...state,
        dataReceived: true,
        entries: [...state.entries, ...entries],
        existingPairs: updatePairs.sort(),
        pageLoading: false,
      }
    }
    case types.FETCH_FAIL:
      return fetchFail(state)
    case types.REFRESH:
      return refresh(TYPE, state, initialState)
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default positionsActiveReducer
