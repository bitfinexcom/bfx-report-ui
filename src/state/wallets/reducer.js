// https://docs.bitfinex.com/reference#rest-auth-wallets
import authTypes from 'state/auth/constants'
import { mapSymbol } from 'state/symbols/utils'

import types from './constants'

// const testEntries = [
//   {
//     type: 'contribution',
//     currency: 'UST',
//     balance: 500,
//     unsettledInterest: 0,
//     balanceAvailable: 500,
//     description: null,
//     meta: null,
//     _isDataFromApiV2: true,
//   },
//   {
//     type: 'creditline',
//     currency: 'UST',
//     balance: 500,
//     unsettledInterest: 0,
//     balanceAvailable: 500,
//     description: null,
//     meta: null,
//     _isDataFromApiV2: true,
//   },
//   {
//     type: 'funding',
//     currency: 'ETH',
//     balance: 212.2957424,
//     unsettledInterest: 0,
//     balanceAvailable: 13.79526684,
//     description: null,
//     meta: null,
//     _isDataFromApiV2: true,
//   },
//   {
//     type: 'funding',
//     currency: 'IOT',
//     balance: 101.65617908,
//     unsettledInterest: 0,
//     balanceAvailable: 101.65617908,
//     description: null,
//     meta: null,
//     _isDataFromApiV2: true,
//   },
//   {
//     type: 'funding',
//     currency: 'JPY',
//     balance: 23468.18510406,
//     unsettledInterest: 0,
//     balanceAvailable: 23468.18510406,
//     description: null,
//     meta: null,
//     _isDataFromApiV2: true,
//   },
//   {
//     type: 'funding',
//     currency: 'USD',
//     balance: 703.00306759,
//     unsettledInterest: 0,
//     balanceAvailable: 28.0424531,
//     description: null,
//     meta: null,
//     _isDataFromApiV2: true,
//   },
//   {
//     type: 'funding',
//     currency: 'UST',
//     balance: 200.72123561,
//     unsettledInterest: 0,
//     balanceAvailable: 200.72123561,
//     description: null,
//     meta: null,
//     _isDataFromApiV2: true,
//   },
//   {
//     type: 'exchange',
//     currency: 'BTC',
//     balance: 1.0745711,
//     unsettledInterest: 0,
//     balanceAvailable: 1.0745711,
//     description: null,
//     meta: null,
//     _isDataFromApiV2: true,
//   },
//   {
//     type: 'exchange',
//     currency: 'ETH',
//     balance: 41.27958958,
//     unsettledInterest: 0,
//     balanceAvailable: 41.27958958,
//     description: null,
//     meta: null,
//     _isDataFromApiV2: true,
//   },
//   {
//     type: 'exchange',
//     currency: 'EUR',
//     balance: 550.27976385,
//     unsettledInterest: 0,
//     balanceAvailable: 550.27976385,
//     description: null,
//     meta: null,
//     _isDataFromApiV2: true,
//   },
//   {
//     type: 'exchange',
//     currency: 'IOT',
//     balance: 301.22971424,
//     unsettledInterest: 0,
//     balanceAvailable: 301.22971424,
//     description: null,
//     meta: null,
//     _isDataFromApiV2: true,
//   },
//   {
//     type: 'exchange',
//     currency: 'JPY',
//     balance: 46691.61216429,
//     unsettledInterest: 0,
//     balanceAvailable: 46691.61216429,
//     description: null,
//     meta: null,
//     _isDataFromApiV2: true,
//   },
//   {
//     type: 'exchange',
//     currency: 'USD',
//     balance: 21836.75178168,
//     unsettledInterest: 0,
//     balanceAvailable: 21836.75178168,
//     description: null,
//     meta: null,
//     _isDataFromApiV2: true,
//   },
//   {
//     type: 'exchange',
//     currency: 'UST',
//     balance: 1336.81517648,
//     unsettledInterest: 0,
//     balanceAvailable: 1336.81517648,
//     description: null,
//     meta: null,
//     _isDataFromApiV2: true,
//   },
//   {
//     type: 'margin',
//     currency: 'USD',
//     balance: 320.00399401,
//     unsettledInterest: 0,
//     balanceAvailable: 320.00399401,
//     description: null,
//     meta: null,
//     _isDataFromApiV2: true,
//   },
//   {
//     type: 'margin',
//     currency: 'USTF0',
//     balance: 150,
//     unsettledInterest: 0,
//     balanceAvailable: 150,
//     description: null,
//     meta: null,
//     _isDataFromApiV2: true,
//   },
// ]

const initialState = {
  dataReceived: false,
  exactBalance: false,
  pageLoading: false,
  entries: [],
  timestamp: undefined,
}

export function walletsReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH_WALLETS:
      return {
        ...state,
        pageLoading: true,
      }
    case types.UPDATE_WALLETS: {
      if (!payload) {
        return {
          ...state,
          dataReceived: true,
          pageLoading: false,
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
          currency: mapSymbol(currency),
          balance,
          balanceUsd,
        }
      }).sort((a, b) => a.currency.localeCompare(b.currency))
      return {
        ...state,
        dataReceived: true,
        pageLoading: false,
        entries,
      }
    }
    case types.SET_TIMESTAMP:
      return {
        ...state,
        timestamp: payload,
      }
    case types.SET_EXACT_BALANCE:
      return {
        ...state,
        exactBalance: payload,
      }
    case types.FETCH_FAIL:
      return state
    case types.REFRESH:
      return {
        ...initialState,
        timestamp: state.timestamp,
        exactBalance: state.exactBalance,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default walletsReducer
