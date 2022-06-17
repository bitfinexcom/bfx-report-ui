import { updateErrorStatus } from 'state/status/actions'
import { isValidTimeStamp } from 'state/query/utils'

import types from './constants'

export function setGoToRange({ range, start, end }) {
  if (!isValidTimeStamp(start) || !isValidTimeStamp(end)) {
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
        start: start - 86400000,
        end: start + 86400000,
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

export default {
  setGoToRange,
  setGoToRangePreserve,
}
