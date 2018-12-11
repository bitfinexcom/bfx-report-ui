import types from './constants'

const initialState = {
  syncMode: types.MODE_ONLINE,
  syncPairs: [],
  startTime: undefined,
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
    case types.SET_PREF: {
      const { pairs: syncPairs, startTime } = payload
      return {
        ...initialState,
        syncPairs,
        startTime,
      }
    }
    default: {
      return state
    }
  }
}

export default syncReducer
