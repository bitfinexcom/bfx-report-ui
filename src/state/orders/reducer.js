// https://docs.bitfinex.com/v2/reference#orders-history
import { formatInternalPair, formatSymbolToPair } from 'state/symbols/utils'
import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  basePairState,
  fetchNext,
  fetchPrev,
  jumpPage,
} from 'state/reducers.helper'

import types from './constants'

const initialState = {
  ...basePairState,
}

const TYPE = queryTypes.MENU_ORDERS

export function ordersReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.UPDATE_ORDERS: {
      const { res, nextPage } = payload
      const { existingPairs } = state
      const updatePairs = [...existingPairs]
      let smallestMts
      const entries = res.map((entry) => {
        const {
          amount,
          amountExecuted,
          amountOrig,
          cid,
          flags,
          gid,
          id,
          mtsCreate,
          mtsUpdate,
          notify,
          placedId,
          price,
          priceAvg,
          priceAuxLimit,
          priceTrailing,
          status,
          symbol,
          type,
          typePrev,
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
          gid,
          cid,
          pair: formatSymbolToPair(symbol),
          mtsCreate,
          mtsUpdate,
          amount,
          amountExecuted,
          amountOrig,
          type,
          typePrev,
          flags,
          status,
          price,
          priceAvg,
          priceTrailing,
          priceAuxLimit,
          notify,
          placedId,
        }
      })
      return {
        ...state,
        entries: [...state.entries, ...entries],
        existingPairs: updatePairs.sort(),
        dataReceived: true,
        smallestMts: nextPage !== false ? nextPage : smallestMts - 1,
        offset: state.offset + entries.length,
        pageOffset: 0,
        pageLoading: false,
        nextPage,
      }
    }
    case types.FETCH_FAIL:
      return {
        ...state,
        pageLoading: false,
      }
    case types.FETCH_NEXT_ORDERS:
      return fetchNext(TYPE, state)
    case types.FETCH_PREV_ORDERS:
      return fetchPrev(TYPE, state)
    case types.JUMP_ORDERS_PAGE:
      return jumpPage(TYPE, state, payload)
    case types.ADD_PAIR:
      return state.targetPairs.includes(payload)
        ? state
        : {
          ...initialState,
          targetPairs: [...state.targetPairs, payload],
          existingPairs: state.existingPairs,
        }
    case types.REMOVE_PAIR:
      return (state.targetPairs.includes(payload))
        ? {
          ...initialState,
          targetPairs: state.targetPairs.filter(pair => pair !== payload),
          existingPairs: state.existingPairs,
        }
        : state
    case types.SET_PAIRS:
      return {
        ...initialState,
        targetPairs: payload,
        existingPairs: state.existingPairs,
      }
    // existingPairs should be re-calc in new time range
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

export default ordersReducer
