import types from './constants'

/**
 * Create an action to set query limit.
 *  @param {integer} size query limit
 */
export function setQueryLimit(size) {
  return {
    type: types.SET_QUERY_LIMIT,
    payload: size,
  }
}

/**
 * Create an action to set time type.
 * @param {integer} type show as local or GMT time
 */
export function setTimeType(type) {
  return {
    type: types.SET_TIME_TYPE,
    payload: type,
  }
}

/**
 * Create an action to set time range.
 * @param {integer} timeRangeType
 * @param {integer} start start time in milliseconds
 * @param {integer} end end time in milliseconds
 */
export function setTimeRange(rangeType, start, end) {
  return {
    type: types.SET_TIME_RANGE,
    payload: {
      rangeType,
      start,
      end,
    },
  }
}

export default {
  setQueryLimit,
  setTimeType,
  setTimeRange,
}
