import { REHYDRATE } from 'redux-persist'
import _get from 'lodash/get'

import types from './constants'

const initialState = {
  range: types.DEFAULT_RANGE,
  start: undefined,
  end: undefined,
  isTimeRangePreserved: true,
}

export function timeRangeReducer(state = initialState, action) {
  const { type, payload = {} } = action

  switch (type) {
    case REHYDRATE:
      if (_get(payload, ['timeRange', 'isTimeRangePreserved'], true)) {
        return state
      }

      return {
        ...initialState,
        isTimeRangePreserved: false,
      }
    case types.SET_TIME_RANGE: {
      const isValidCustom = payload.range === types.CUSTOM
        && payload.start
        && payload.end

      return {
        ...state,
        range: payload.range || types.DEFAULT_RANGE,
        start: isValidCustom ? payload.start : undefined,
        end: isValidCustom ? payload.end : undefined,
      }
    }
    case types.TOGGLE_TIME_RANGE_PRESERVE:
      return {
        ...state,
        isTimeRangePreserved: !state.isTimeRangePreserved,
      }
    default:
      return state
  }
}

export default timeRangeReducer
