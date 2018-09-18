import { updateErrorStatus } from 'state/status/actions'

import types from './constants'
import { isValidTimeStamp } from './utils'

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

/**
 * Create an action to custom time range.
 * @param {integer} start start time in milliseconds
 * @param {integer} end end time in milliseconds
 */
export function setCustomTimeRange(start, end) {
  if (isValidTimeStamp(start) && isValidTimeStamp(end)) {
    return setTimeRange(types.TIME_RANGE_CUSTOM, start, end)
  }
  return updateErrorStatus({
    id: 'status.fail',
    topic: 'timeframe.custom-timerange',
    detail: `with wrong format ${start}-${end}`,
  })
}

/**
 * Create an action to export CSV.
 * @param {string} target export type
 */
export function exportCsv(target) {
  return {
    type: types.EXPORT_CSV,
    payload: target,
  }
}

/**
 * Create an action to prepare export related params.
 */
export function prepareExport() {
  return {
    type: types.PREPARE_EXPORT,
  }
}

/**
 * Create an action to export CSV.
 * @param {boolean | string} payload return false or the email address
 */
export function exportReady(payload) {
  return {
    type: types.EXPORT_READY,
    payload,
  }
}

export default {
  exportCsv,
  exportReady,
  prepareExport,
  setCustomTimeRange,
  setQueryLimit,
  setTimeType,
  setTimeRange,
}
