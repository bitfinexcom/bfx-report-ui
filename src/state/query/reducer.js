import types from './constants'

const initialState = {
  email: '',
  queryLimit: types.DEFAULT_QUERY_LIMIT,
  timeRange: types.DEFAULT_RANGE,
  timeType: types.DEFAULT_TIME_TYPE,
}

export function queryReducer(state = initialState, action) {
  const { type, payload = {} } = action
  switch (type) {
    case types.SET_QUERY_LIMIT:
      return {
        ...state,
        queryLimit: payload,
      }
    case types.SET_TIME_RANGE: {
      const isValidCustom = payload.rangeType === types.TIME_RANGE_CUSTOM
        && payload.start
        && payload.end
      return {
        ...state,
        timeRange: payload.rangeType || types.DEFAULT_RANGE,
        start: isValidCustom ? payload.start : undefined,
        end: isValidCustom ? payload.end : undefined,
      }
    }
    case types.EXPORT_READY: {
      const email = action.payload === false ? '' : action.payload
      return {
        ...state,
        email,
      }
    }
    default: {
      return state
    }
  }
}

export default queryReducer
