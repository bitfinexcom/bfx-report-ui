import authTypes from 'state/auth/constants'
import { getFrameworkPositionsEntries, getFrameworkPositionsTickersEntries } from 'state/utils'

import types from './constants'

const initialState = {
  dataReceived: false,
  depositsTotalAmount: undefined,
  endPositionsSnapshot: [],
  endTickers: [],
  movementsEntries: [],
  movementsTotalAmount: undefined,
  startPositionsSnapshot: [],
  startTickers: [],
  winLossTotalAmount: undefined,
  withdrawalsTotalAmount: undefined,
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
    currency,
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
        depositsTotalAmount,
        endPositionsSnapshot,
        endTickers,
        movements,
        movementsTotalAmount,
        startPositionsSnapshot,
        startTickers,
        winLossTotalAmount,
        withdrawalsTotalAmount,
      } = payload

      return {
        ...state,
        dataReceived: true,
        depositsTotalAmount,
        endPositionsSnapshot: getFrameworkPositionsEntries(endPositionsSnapshot),
        endTickers: getFrameworkPositionsTickersEntries(endTickers),
        movementsEntries: getMovementsEntries(movements),
        movementsTotalAmount,
        startPositionsSnapshot: getFrameworkPositionsEntries(startPositionsSnapshot),
        startTickers: getFrameworkPositionsTickersEntries(startTickers),
        winLossTotalAmount,
        withdrawalsTotalAmount,
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
        timestamp: state.timestamp,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default taxReportReducer
