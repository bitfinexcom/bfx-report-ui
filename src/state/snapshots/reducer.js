import authTypes from 'state/auth/constants'
import {
  getFrameworkPositionsEntries,
  getFrameworkPositionsTickersEntries,
  getWalletsTickersEntries,
  getWalletsEntries,
} from 'state/utils'

import types from './constants'

export const initialState = {
  dataReceived: false,
  pageLoading: false,
  positionsTotalPlUsd: null,
  positionsEntries: [],
  positionsTickersEntries: [],
  walletsTotalBalanceUsd: null,
  walletsTickersEntries: [],
  walletsEntries: [],
  timestamp: undefined,
}

export function snapshotsReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.UPDATE_SNAPSHOTS: {
      if (!payload) {
        return {
          ...state,
          dataReceived: true,
          pageLoading: false,
        }
      }

      const {
        positionsSnapshot = [], positionsTickers = [], walletsTickers = [], walletsSnapshot = [],
        positionsTotalPlUsd = null, walletsTotalBalanceUsd = null,
      } = payload

      return {
        ...state,
        dataReceived: true,
        pageLoading: false,
        positionsTotalPlUsd,
        positionsEntries: getFrameworkPositionsEntries(positionsSnapshot),
        positionsTickersEntries: getFrameworkPositionsTickersEntries(positionsTickers),
        walletsTotalBalanceUsd,
        walletsTickersEntries: getWalletsTickersEntries(walletsTickers),
        walletsEntries: getWalletsEntries(walletsSnapshot),
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

export default snapshotsReducer
