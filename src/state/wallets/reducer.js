// https://docs.bitfinex.com/v2/reference#rest-auth-wallets
import authTypes from 'state/auth/constants'

import types from './constants'

const initialState = {
  dataReceived: false,
  entries: [],
  timestamp: null,
}

export function walletsReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.UPDATE_WALLETS: {
      if (!payload) {
        return {
          ...state,
          dataReceived: true,
        }
      }
      const entries = payload.map((entry) => {
        const {
          type,
          currency,
          balance,
          balanceUsd,
        } = entry
        return {
          type,
          currency,
          balance,
          balanceUsd,
        }
      }).sort((a, b) => a.currency.localeCompare(b.currency))
      return {
        ...state,
        dataReceived: true,
        entries,
      }
    }
    case types.SET_TIMESTAMP:
      return {
        ...initialState,
        timestamp: payload,
      }
    case types.FETCH_FAIL:
      return state
    case types.REFRESH:
      return {
        ...initialState,
        timestamp: state.timestamp,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default walletsReducer
