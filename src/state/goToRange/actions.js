import { updateErrorStatus } from 'state/status/actions'
import { isValidTimeStamp } from 'state/query/utils'

import types, { OFFSETS } from './constants'

export function setGoToRange({
  range, start, end, timeFrame = '1h',
}) {
  if ((start > end) || !isValidTimeStamp(start) || !isValidTimeStamp(end)) {
    return updateErrorStatus({
      id: 'status.fail',
      topic: 'timeframe.custom-timerange',
      detail: `with wrong format ${start}-${end}`,
    })
  }

  if (range === types.DATE) {
    return {
      type: types.SET_GO_TO_RANGE,
      payload: {
        range,
        // -+ offsets to center single selected date on the chart range
        start: start - OFFSETS[timeFrame],
        end: start + OFFSETS[timeFrame],
      },
    }
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

export function setGoToRangePreserve(payload) {
  return {
    type: types.SET_GO_TO_RANGE_PRESERVE,
    payload,
  }
}

export function handleGoToRange(payload) {
  return {
    type: types.HANDLE_GO_TO_RANGE,
    payload,
  }
}

export default {
  setGoToRange,
  handleGoToRange,
  setGoToRangePreserve,
}
