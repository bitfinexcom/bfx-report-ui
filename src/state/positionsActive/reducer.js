// data format https://github.com/bitfinexcom/bfx-api-node-models/blob/master/lib/position_hist.js
import _get from 'lodash/get'

import { formatPair, mapPair } from 'state/symbols/utils'
import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  addPair,
  basePairState,
  fetchFail,
  fetchNext,
  fetchPrev,
  getPageOffset,
  jumpPage,
  removePair,
  setPairs,
  setTimeRange,
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
      if (!_get(payload, ['data'])) {
        return {
          ...state,
          dataReceived: true,
        }
      }
      const { data: res, limit, pageSize } = payload
      const { existingPairs } = state
      const updatePairs = [...existingPairs]
      let smallestMts
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
        // log smallest mts
        if (!smallestMts || smallestMts > mtsUpdate) {
          smallestMts = mtsUpdate
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
      const [offset, pageOffset] = getPageOffset(state, entries, limit, pageSize)
      return {
        ...state,
        currentEntriesSize: entries.length,
        dataReceived: true,
        entries: [...state.entries, ...entries],
        existingPairs: updatePairs.sort(),
        smallestMts: smallestMts - 1,
        offset,
        pageOffset,
        pageLoading: false,
      }
    }
    case types.FETCH_FAIL:
      return fetchFail(state)
    case types.FETCH_NEXT_APOSITIONS:
      return fetchNext(TYPE, state, payload)
    case types.FETCH_PREV_APOSITIONS:
      return fetchPrev(TYPE, state, payload)
    case types.JUMP_APOSITIONS_PAGE:
      return jumpPage(TYPE, state, payload)
    case types.ADD_PAIR:
      return addPair(state, payload, initialState)
    case types.REMOVE_PAIR:
      return removePair(state, payload, initialState)
    case types.SET_PAIRS:
      return setPairs(state, payload, initialState)
    case types.REFRESH:
    case queryTypes.SET_TIME_RANGE:
      return setTimeRange(TYPE, state, initialState)
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default positionsActiveReducer
