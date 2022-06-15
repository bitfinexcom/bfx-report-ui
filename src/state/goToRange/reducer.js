import { REHYDRATE } from 'redux-persist'
import _get from 'lodash/get'

import types from './constants'

const initialState = {
  range: types.DEFAULT_RANGE,
  start: undefined,
  end: undefined,
  isGoToRangePreserved: true,
}

export function goToRangeReducer(state = initialState, action) {
  const { type, payload = {} } = action

  switch (type) {
    case REHYDRATE:
      if (_get(payload, ['goToRange', 'isGoToRangePreserved'], true)) {
        return state
      }

      return {
        ...initialState,
        isGoToRangePreserved: false,
      }
    case types.SET_GO_TO_RANGE: {
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
    case types.TOGGLE_GO_TO_RANGE_PRESERVE:
      return {
        ...state,
        isGoToRangePreserved: !state.isGoToRangePreserved,
      }
    default:
      return state
  }
}

export default goToRangeReducer
