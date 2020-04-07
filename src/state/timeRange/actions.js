import { updateErrorStatus } from 'state/status/actions'
import { isValidTimeStamp } from 'state/query/utils'

import types from './constants'

/**
 * Create an action to set time range.
 * @param {string} range
 * @param {number} start time in milliseconds
 * @param {number} end time in milliseconds
 */
export function setTimeRange({ range, start, end }) {
  if (range === types.CUSTOM && (!isValidTimeStamp(start) || !isValidTimeStamp(end))) {
    return updateErrorStatus({
      id: 'status.fail',
      topic: 'timeframe.custom-timerange',
      detail: `with wrong format ${start}-${end}`,
    })
  }

  return {
    type: types.SET_TIME_RANGE,
    payload: {
      range,
      start,
      end,
    },
  }
}

export default {
  setTimeRange,
}
