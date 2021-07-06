import types from './constants'

const initPairsState = {
  pairs: ['BTC:USD'],
  startTime: undefined,
}

const initialState = {
  syncMode: types.MODE_ONLINE,
  config: {
    publicTradesConf: initPairsState,
    publicFundingConf: {
      symbols: ['USD'],
      startTime: undefined,
    },
    tickersHistoryConf: initPairsState,
    candlesConf: [],
    statusMessagesConf: [],
  },
  isSyncing: false,
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
    case types.SET_IS_SYNCING: {
      return {
        ...state,
        isSyncing: payload,
      }
    }
    case types.EDIT_CONFIG: {
      return {
        ...state,
        config: {
          ...state.config,
          ...payload,
        },
      }
    }
    case types.EDIT_PUBLIC_TRADES_PREF: {
      const { pairs, startTime } = payload
      return {
        ...state,
        config: {
          ...state.config,
          publicTradesConf: {
            pairs,
            startTime,
          },
        },
      }
    }
    case types.EDIT_PUBLIC_FUNDING_PREF: {
      const { symbols, startTime } = payload
      return {
        ...state,
        config: {
          ...state.config,
          publicFundingConf: {
            symbols,
            startTime,
          },
        },
      }
    }
    case types.EDIT_TICKERS_HISTORY_PREF: {
      const { pairs, startTime } = payload
      return {
        ...state,
        config: {
          ...state.config,
          tickersHistoryConf: {
            pairs,
            startTime,
          },
        },
      }
    }
    case types.EDIT_CANDLES_PREF: {
      return {
        ...state,
        config: {
          ...state.config,
          candlesConf: payload,
        },
      }
    }
    case types.EDIT_DERIVATIVES_PREF: {
      return {
        ...state,
        config: {
          ...state.config,
          statusMessagesConf: payload,
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
