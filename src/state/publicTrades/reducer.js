import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import {
  baseState,
  fetchNext,
  fetchPrev,
  jumpPage,
} from 'state/reducers.helper'

import types from './constants'

const initialState = {
  ...baseState,
  targetPair: 'btcusd',
}

const TYPE = queryTypes.MENU_PUBLIC_TRADES

export function publicTradesReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.UPDATE_PUBLIC_TRADES: {
      const { res, nextPage } = payload
      let smallestMts
      const entries = res.map((entry) => {
        const {
          amount,
          price,
          id,
          mts,
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
          price,
          type: parseFloat(amount) > 0 ? 'BUY' : 'SELL',
        }
      })
      return {
        ...state,
        entries: [...state.entries, ...entries],
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
    case types.FETCH_NEXT_PUBLIC_TRADES:
      return fetchNext(TYPE, state)
    case types.FETCH_PREV_PUBLIC_TRADES:
      return fetchPrev(TYPE, state)
    case types.JUMP_PUBLIC_TRADES_PAGE:
      return jumpPage(TYPE, state, payload)
    case types.SET_PAIR:
      return {
        ...initialState,
        targetPair: payload,
      }
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

export default publicTradesReducer
