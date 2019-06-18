// data format https://github.com/bitfinexcom/bfx-api-node-models/blob/master/lib/position_hist.js
import { formatSymbolToPair } from 'state/symbols/utils'
import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  baseState,
  fetchFail,
  fetchNext,
  fetchPrev,
  getPageOffset,
  jumpPage,
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
      if (!payload) {
        return {
          ...state,
          dataReceived: true,
        }
      }
      const { data, limit, pageSize } = payload
      const { res, nextPage } = data
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
          status,
          symbol,
        } = entry
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
          status,
        }
      })
      const [offset, pageOffset] = getPageOffset(state, entries, limit, pageSize)
      return {
        ...state,
        currentEntriesSize: entries.length,
        dataReceived: true,
        entries: [...state.entries, ...entries],
        smallestMts: nextPage !== false ? nextPage : smallestMts - 1,
        offset,
        pageOffset,
        pageLoading: false,
        nextPage,
      }
    }
    case types.FETCH_FAIL:
      return fetchFail(state)
    case types.FETCH_NEXT_PAUDIT:
      return fetchNext(TYPE, state, payload)
    case types.FETCH_PREV_PAUDIT:
      return fetchPrev(TYPE, state, payload)
    case types.JUMP_PAUDIT_PAGE:
      return jumpPage(TYPE, state, payload)
    case types.ADD_ID:
      return state.targetIds.includes(payload)
        ? state
        : {
          ...initialState,
          targetIds: [...state.targetIds, payload],
        }
    case types.REMOVE_ID:
      return (state.targetIds.includes(payload))
        ? {
          ...initialState,
          targetIds: state.targetIds.filter(id => id !== payload),
        }
        : state
    case types.SET_IDS:
      return {
        ...initialState,
        targetIds: payload,
      }
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

export default positionsAuditReducer
