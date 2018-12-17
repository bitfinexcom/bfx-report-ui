// data format https://github.com/bitfinexcom/bfx-api-node-models/blob/master/lib/position_hist.js
import { formatInternalPair, formatSymbolToPair } from 'state/symbols/utils'
import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  addPair,
  basePairState,
  fetchFail,
  fetchNext,
  fetchPrev,
  jumpPage,
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
    case types.UPDATE_POSITIONS: {
      if (!payload) {
        return {
          ...state,
          dataReceived: true,
        }
      }
      const { res, nextPage } = payload
      const { existingPairs } = state
      const updatePairs = [...existingPairs]
      let smallestMts
      const entries = res.map((entry) => {
        const {
          amount,
          basesPrice,
          id,
          leverage,
          marginFunding,
          marginFundingType,
          mtsCreate,
          mtsUpdate,
          pl, // Profit & Loss
          plPerc, // Profit & Loss Percentage
          liquidationPrice, // Liquidation price
          status,
          symbol,
        } = entry
        const internalPair = formatInternalPair(symbol)
        // save new pair to updatePairs list
        if (updatePairs.indexOf(internalPair) === -1) {
          updatePairs.push(internalPair)
        }
        // log smallest mts
        if (nextPage === false
          && (!smallestMts || smallestMts > mtsUpdate)
        ) {
          smallestMts = mtsUpdate
        }
        return {
          id,
          pair: formatSymbolToPair(symbol),
          amount,
          basesPrice,
          leverage,
          marginFunding,
          marginFundingType,
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
        currentEntriesSize: entries.length,
        dataReceived: true,
        entries: [...state.entries, ...entries],
        existingPairs: updatePairs.sort(),
        smallestMts: nextPage !== false ? nextPage : smallestMts - 1,
        offset: state.offset + entries.length,
        pageOffset: 0,
        pageLoading: false,
        nextPage,
      }
    }
    case types.FETCH_FAIL:
      return fetchFail(state)
    case types.FETCH_NEXT_ORDERS:
      return fetchNext(TYPE, state)
    case types.FETCH_PREV_ORDERS:
      return fetchPrev(TYPE, state)
    case types.JUMP_ORDERS_PAGE:
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

export default positionsReducer
