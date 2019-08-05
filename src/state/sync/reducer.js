import types from './constants'

const initialState = {
  syncMode: types.MODE_ONLINE,
  syncPairs: [],
  syncSymbols: [],
  startTime: undefined,
  progress: null,
  isSyncEnabled: false,
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
    case types.SET_PAIR_PREF:
    case types.EDIT_PAIR_PREF: {
      const { pairs: syncPairs, startTime } = payload
      return {
        ...state,
        startTime,
        syncPairs,
      }
    }
    case types.SET_SYMBOL_PREF:
    case types.EDIT_SYMBOL_PREF: {
      const { symbols: syncSymbols, startTime } = payload
      return {
        ...state,
        startTime,
        syncSymbols,
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
