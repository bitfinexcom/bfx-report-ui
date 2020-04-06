import { updateErrorStatus } from 'state/status/actions'
import { isValidTimeStamp } from 'state/query/utils'

import types from './constants'

/**
 * Create an action to set time range.
 * @param {string} rangeType
 * @param {number} start time in milliseconds
 * @param {number} end time in milliseconds
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
 * @param {number} start time in milliseconds
 * @param {number} end time in milliseconds
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

export default {
  setCustomTimeRange,
  setTimeRange,
}
