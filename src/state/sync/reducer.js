import types from './constants'

const initialState = {
  syncMode: types.MODE_ONLINE,
  publicTradesPairs: [],
  publicTradesSymbols: [],
  tickersHistoryPairs: [],
  startTime: undefined,
  progress: 0,
}

export function syncReducer(state = initialState, action) {
  const { payload, type } = action
  switch (type) {
    case types.SET_SYNC_MODE: {
      return {
        ...state,
        syncMode: payload,
      }
    }
    case types.EDIT_PUBLIC_TRADES_PAIRS_PREF: {
      const { pairs, startTime } = payload
      return {
        ...state,
        startTime,
        publicTradesPairs: pairs,
      }
    }
    case types.EDIT_PUBLIC_TRADES_SYMBOLS_PREF: {
      const { symbols, startTime } = payload
      return {
        ...state,
        startTime,
        publicTradesSymbols: symbols,
      }
    }
    case types.EDIT_TICKERS_HISTORY_PAIRS_PREF: {
      const { pairs, startTime } = payload
      return {
        ...state,
        startTime,
        tickersHistoryPairs: pairs,
      }
    }
    case types.SET_PREF: {
      return {
        ...state,
        ...payload,
      }
    }
    case types.SET_PROGRESS: {
      return {
        ...state,
        progress: payload,
      }
    }
    default: {
      return state
    }
  }
}

export default syncReducer
