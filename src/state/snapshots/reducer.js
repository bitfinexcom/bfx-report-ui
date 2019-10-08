import authTypes from 'state/auth/constants'
import {
  getFrameworkPositionsEntries,
  getFrameworkPositionsTickersEntries,
  getWalletsTickersEntries,
  getWalletsEntries,
} from 'state/utils'

import types from './constants'

const initialState = {
  dataReceived: false,
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
        }
      }

      const {
        positionsSnapshot = [], positionsTickers = [], walletsTickers = [], walletsSnapshot = [],
        positionsTotalPlUsd, walletsTotalBalanceUsd,
      } = payload

      return {
        ...state,
        dataReceived: true,
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
