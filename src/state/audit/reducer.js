// data format https://github.com/bitfinexcom/bfx-api-node-models/blob/master/lib/position_hist.js
import _get from 'lodash/get'

import { formatPair, mapPair } from 'state/symbols/utils'
import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  baseState,
  fetchFail,
  setTimeRange,
} from 'state/reducers.helper'

import types from './constants'

const initialState = {
  ...baseState,
  targetIds: [],
}

const TYPE = queryTypes.MENU_POSITIONS_AUDIT

export function positionsAuditReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.UPDATE_PAUDIT: {
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
          basePrice,
          collateral,
          id,
          leverage,
          marginFunding,
          marginFundingType,
          meta,
          mtsCreate,
          mtsUpdate,
          status,
          symbol,
        } = entry
        return {
          id,
          pair: mapPair(formatPair(symbol)),
          amount,
          basePrice,
          collateral,
          leverage,
          marginFunding,
          marginFundingType,
          meta,
          mtsCreate,
          mtsUpdate,
          status,
        }
      })
      return {
        ...state,
        dataReceived: true,
        entries: [...state.entries, ...entries],
        pageLoading: false,
      }
    }
    case types.FETCH_FAIL:
      return fetchFail(state)
    case types.SET_IDS:
      return {
        ...initialState,
        targetIds: payload,
      }
    case types.REFRESH:
      return {
        ...initialState,
        targetIds: state.targetIds,
      }
    case queryTypes.SET_TIME_RANGE:
      return setTimeRange(TYPE, state, initialState)
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default positionsAuditReducer
