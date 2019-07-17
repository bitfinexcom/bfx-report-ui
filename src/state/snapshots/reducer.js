import authTypes from 'state/auth/constants'
import { formatSymbolToPair, mapSymbol } from 'state/symbols/utils'

import types from './constants'

const initialState = {
  dataReceived: false,
  positionsEntries: [],
  walletsEntries: [],
  timestamp: undefined,
}

const getPositionsEntries = entries => entries.map((entry) => {
  const {
    actualPrice,
    amount,
    basePrice,
    id,
    leverage,
    marginFunding,
    marginFundingType,
    mtsCreate,
    mtsUpdate,
    pl,
    plUsd,
    plPerc,
    liquidationPrice,
    status,
    symbol,
  } = entry

  return {
    id,
    pair: formatSymbolToPair(symbol).split('/').map(mapSymbol).join('/'),
    actualPrice,
    amount,
    basePrice,
    leverage,
    marginFunding,
    marginFundingType,
    mtsCreate,
    mtsUpdate,
    pl,
    plUsd,
    plPerc,
    liquidationPrice,
    status,
  }
})

const getWalletsEntries = entries => entries.map((entry) => {
  const {
    type,
    currency,
    // mtsUpdate, 1562657495000
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

      const { positionsSnapshot = [], walletsSnapshot = [] } = payload

      return {
        ...state,
        dataReceived: true,
        positionsEntries: getPositionsEntries(positionsSnapshot),
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
