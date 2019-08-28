import types from './constants'

const initialState = {
  syncMode: types.MODE_ONLINE,
  publicTrades: {
    pairs: [],
    startTime: undefined,
  },
  publicFunding: {
    symbols: [],
    startTime: undefined,
  },
  tickersHistory: {
    pairs: [],
    startTime: undefined,
  },
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
    case types.EDIT_PUBLIC_TRADES_PREF: {
      const { pairs, startTime } = payload
      return {
        ...state,
        publicTrades: {
          pairs,
          startTime,
        },
      }
    }
    case types.EDIT_PUBLIC_FUNDING_PREF: {
      const { symbols, startTime } = payload
      return {
        ...state,
        publicFunding: {
          symbols,
          startTime,
        },
      }
    }
    case types.EDIT_TICKERS_HISTORY_PREF: {
      const { pairs, startTime } = payload
      return {
        ...state,
        tickersHistory: {
          pairs,
          startTime,
        },
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
