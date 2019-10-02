import authTypes from 'state/auth/constants'
import { getFrameworkPositionsEntries } from 'state/utils'
import { mapSymbol } from 'state/symbols/utils'

import types from './constants'

const initialState = {
  dataReceived: false,
  startingPositionsSnapshot: [],
  endingPositionsSnapshot: [],
  finalState: {
    startingPeriodBalances: {
      walletsTotalBalanceUsd: null,
      positionsTotalPlUsd: null,
      totalResult: null,
    },
    movements: [],
    movementsTotalAmount: null,
    endingPeriodBalances: {
      walletsTotalBalanceUsd: null,
      positionsTotalPlUsd: null,
      totalResult: null,
    },
    totalResult: null,
  },
  start: undefined,
  end: undefined,
}

const getMovementsEntries = entries => entries.map((entry) => {
  const {
    amount,
    amountUsd,
    currency,
    currencyName,
    destinationAddress,
    fees,
    id,
    mtsStarted,
    mtsUpdated,
    status,
    transactionId,
  } = entry

  return {
    amount,
    amountUsd,
    currency: mapSymbol(currency),
    currencyName,
    destinationAddress,
    fees,
    id,
    mtsStarted,
    mtsUpdated,
    status,
    transactionId,
  }
})

export function taxReportReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.UPDATE_TAX_REPORT: {
      if (!payload) {
        return {
          ...state,
          dataReceived: true,
        }
      }

      const {
        startingPositionsSnapshot,
        endingPositionsSnapshot,
        finalState: {
          startingPeriodBalances,
          movements,
          movementsTotalAmount,
          endingPeriodBalances,
          totalResult,
        },
      } = payload

      return {
        ...state,
        dataReceived: true,
        endingPositionsSnapshot: getFrameworkPositionsEntries(endingPositionsSnapshot),
        finalState: {
          startingPeriodBalances: startingPeriodBalances || {},
          movements: getMovementsEntries(movements),
          movementsTotalAmount,
          endingPeriodBalances: endingPeriodBalances || {},
          totalResult,
        },
        startingPositionsSnapshot: getFrameworkPositionsEntries(startingPositionsSnapshot),
      }
    }
    case types.SET_PARAMS:
      return {
        ...initialState,
        ...payload,
      }
    case types.FETCH_FAIL:
      return state
    case types.REFRESH:
      return {
        ...initialState,
        start: state.start,
        end: state.end,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default taxReportReducer
