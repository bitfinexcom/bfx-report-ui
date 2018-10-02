import types from './constants'

const initialState = {
  syncMode: types.MODE_ONLINE,
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
    default: {
      return state
    }
  }
}

export default syncReducer
