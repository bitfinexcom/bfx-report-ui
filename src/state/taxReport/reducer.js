import authTypes from 'state/auth/constants'
import {
  getFrameworkPositionsEntries,
  getFrameworkPositionsTickersEntries,
  getWalletsTickersEntries,
  getWalletsEntries,
} from 'state/utils'
import { mapSymbol } from 'state/symbols/utils'
import TAX_REPORT_SECTIONS from 'components/TaxReport/TaxReport.sections'

import types from './constants'

const snapshotInitState = {
  dataReceived: false,
  pageLoading: false,
  positionsTotalPlUsd: null,
  positionsEntries: [],
  positionsTickersEntries: [],
  walletsTotalBalanceUsd: null,
  walletsTickersEntries: [],
  walletsEntries: [],
}

const finalResultInitState = {
  dataReceived: false,
  pageLoading: false,
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
}

const initialState = {
  startSnapshot: snapshotInitState,
  endSnapshot: snapshotInitState,
  ...finalResultInitState,
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

const getSectionProperty = (section) => {
  if (section === TAX_REPORT_SECTIONS.START_SNAPSHOT) {
    return 'startSnapshot'
  }
  return 'endSnapshot'
}

export function taxReportReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.UPDATE_TAX_REPORT: {
      if (!payload) {
        return {
          ...state,
          dataReceived: true,
          pageLoading: false,
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
        pageLoading: false,
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
    case types.UPDATE_TAX_REPORT_SNAPSHOT: {
      const { result, section } = payload
      const snapshotSection = getSectionProperty(section)
      if (!result) {
        return {
          ...state,
          [snapshotSection]: {
            ...state[snapshotSection],
            dataReceived: true,
            pageLoading: false,
          },
        }
      }

      const {
        positionsSnapshot = [], positionsTickers = [], walletsTickers = [], walletsSnapshot = [],
        positionsTotalPlUsd, walletsTotalBalanceUsd,
      } = result

      return {
        ...state,
        [snapshotSection]: {
          dataReceived: true,
          pageLoading: false,
          positionsTotalPlUsd,
          positionsEntries: getFrameworkPositionsEntries(positionsSnapshot),
          positionsTickersEntries: getFrameworkPositionsTickersEntries(positionsTickers),
          walletsTotalBalanceUsd,
          walletsTickersEntries: getWalletsTickersEntries(walletsTickers),
          walletsEntries: getWalletsEntries(walletsSnapshot),
        },
      }
    }
    case types.SET_PARAMS: {
      const { params: { start, end } } = payload
      return {
        ...initialState,
        start,
        end,
      }
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
