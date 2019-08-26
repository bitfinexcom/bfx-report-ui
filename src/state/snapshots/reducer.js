import authTypes from 'state/auth/constants'
import { formatSymbolToPair, mapSymbol } from 'state/symbols/utils'

import types from './constants'

const initialState = {
  dataReceived: false,
  positionsEntries: [],
  tickersEntries: [],
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

const getTickersEntires = entries => entries.map((entry) => {
  const {
    symbol,
    amount,
  } = entry

  return {
    pair: formatSymbolToPair(symbol).split('/').map(mapSymbol).join('/'),
    amount,
  }
})

const getWalletsEntries = entries => entries.map((entry) => {
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

      const { positionsSnapshot = [], tickers = [], walletsSnapshot = [] } = payload

      return {
        ...state,
        dataReceived: true,
        positionsEntries: getPositionsEntries(positionsSnapshot),
        tickersEntries: getTickersEntires(tickers),
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
