import { makeDate } from 'utils/dates'

import types from './constants'

const pastDay = makeDate(d => d.setDate(d.getDate() - 1))

const initialState = {
  range: types.DEFAULT_RANGE,
  start: pastDay,
  end: new Date().getTime(),
  isGoToRangePreserved: false,
}

export function goToRangeReducer(state = initialState, action) {
  const { type, payload = {} } = action

  switch (type) {
    case types.SET_GO_TO_RANGE: {
      return {
        ...state,
        range: payload.range || types.DEFAULT_RANGE,
        start: payload.start,
        end: payload.end,
      }
    }
    case types.SET_GO_TO_RANGE_PRESERVE:
      return {
        ...state,
        isGoToRangePreserved: payload,
      }
    default:
      return state
  }
}

export default goToRangeReducer
