import types from './constants'

const DEFAULT_QUERY_LIMIT = 0
const DEFAULT_RANGE = types.TIME_RANGE_LAST_2WEEKS
const DEFAULT_TIME_TYPE = types.TIME_TYPE_LOCALTIME
const initialState = {
  queryLimit: DEFAULT_QUERY_LIMIT,
  timeRange: DEFAULT_RANGE,
  timeType: DEFAULT_TIME_TYPE,
}

export function queryReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_QUERY_LIMIT:
      return {
        ...state,
        queryLimit: action.payload,
      }
    case types.SET_TIME_RANGE:
      return {
        ...state,
        timeRange: (action.payload && action.payload.rangeType) || DEFAULT_RANGE,
      }
    default: {
      return state
    }
  }
}

export default queryReducer
