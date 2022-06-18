import { updateErrorStatus } from 'state/status/actions'
import { isValidTimeStamp } from 'state/query/utils'

import types from './constants'

export function setGoToRange({ range, start, end }) {
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
        start: start - 3600000,
        end: start + 3600000,
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
