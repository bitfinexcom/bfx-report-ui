// https://docs.bitfinex.com/v2/reference#rest-public-trades
import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  baseState,
  fetchFail,
  fetchNext,
  fetchPrev,
  getPageOffset,
  jumpPage,
} from 'state/reducers.helper'

import types from './constants'

const initialState = {
  ...baseState,
  targetSymbol: 'USD',
}

const TYPE = queryTypes.MENU_PUBLIC_FUNDING

export function publicFundingReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.UPDATE_PUBLIC_FUNDING: {
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
          id,
          mts,
          period,
          rate,
        } = entry
        // log smallest mts
        if (nextPage === false
          && (!smallestMts || smallestMts > mts)
        ) {
          smallestMts = mts
        }
        return {
          id,
          mts,
          amount,
          period,
          rate,
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
    case types.FETCH_NEXT_PUBLIC_FUNDING:
      return fetchNext(TYPE, state, payload)
    case types.FETCH_PREV_PUBLIC_FUNDING:
      return fetchPrev(TYPE, state, payload)
    case types.JUMP_PUBLIC_FUNDING_PAGE:
      return jumpPage(TYPE, state, payload)
    case types.SET_SYMBOL:
      return {
        ...initialState,
        targetSymbol: payload,
      }
    case types.REFRESH:
    case queryTypes.SET_TIME_RANGE:
      return {
        ...initialState,
        targetSymbol: state.targetSymbol,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default publicFundingReducer
