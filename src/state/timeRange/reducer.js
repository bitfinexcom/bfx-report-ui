import types from './constants'

const initialState = {
  range: types.DEFAULT_RANGE,
  start: undefined,
  end: undefined,
}

export function timeRangeReducer(state = initialState, action) {
  const { type, payload = {} } = action
  switch (type) {
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
    default:
      return state
  }
}

export default timeRangeReducer
