import types from './constants'

const initialState = {
  queryLimit: types.DEFAULT_QUERY_LIMIT,
  timeRange: types.DEFAULT_RANGE,
  timeType: types.DEFAULT_TIME_TYPE,
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
        timeRange: (action.payload && action.payload.rangeType) || types.DEFAULT_RANGE,
      }
    default: {
      return state
    }
  }
}

export default queryReducer
