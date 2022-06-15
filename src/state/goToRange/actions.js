import { updateErrorStatus } from 'state/status/actions'
import { isValidTimeStamp } from 'state/query/utils'

import types from './constants'

/**
 * Create an action to set got to range.
 * @param {string} range
 * @param {number} start time in milliseconds
 * @param {number} end time in milliseconds
 */
export function setGoToRange({ range, start, end }) {
  if (range === types.CUSTOM && (!isValidTimeStamp(start) || !isValidTimeStamp(end))) {
    return updateErrorStatus({
      id: 'status.fail',
      topic: 'timeframe.custom-timerange',
      detail: `with wrong format ${start}-${end}`,
    })
  }

  return {
    type: types.SET_GO_TO_RANGE,
    payload: {
      range,
      start,
      end,
    },
  }
}

/**
 * Create an action to toggle got to range preserve setting.
 */
export function toggleGoToRangePreserve() {
  return {
    type: types.TOGGLE_GO_TO_RANGE_PRESERVE,
  }
}

export default {
  setGoToRange,
  toggleGoToRangePreserve,
}
