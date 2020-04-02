import authTypes from 'state/auth/constants'

import types from './constants'

const initialState = {
  email: '',
  exportEmail: '',
  timeRange: types.DEFAULT_RANGE,
  timeType: types.DEFAULT_TIME_TYPE,
}

export function queryReducer(state = initialState, action) {
  const { type, payload = {} } = action
  switch (type) {
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
    case types.SET_OWNER_EMAIL:
      return {
        ...state,
        email: payload || '',
      }
    case types.SET_EXPORT_EMAIL:
      return {
        ...state,
        exportEmail: payload || '',
      }
    case authTypes.LOGOUT:
      return initialState
    default:
      return state
  }
}

export default queryReducer
