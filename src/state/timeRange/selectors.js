import constants from './constants'

const {
  TIME_RANGE_LAST_24HOURS,
  TIME_RANGE_PAST_MONTH,
  TIME_RANGE_PAST_3MONTH,
  TIME_RANGE_CUSTOM,
  TIME_RANGE_LAST_2WEEKS,
} = constants

export const getTimeRange = state => state.timeRange

const DAY = 1000 * 60 * 60 * 24
const WEEKS_2 = 1000 * 60 * 60 * 24 * 7 * 2

/**
 * Selector to return query range (in milliseconds).
 * @param {object} state query state
 * @param {number} smallestMts timestamp of the last checked entry, used for pagination
 */
export function getTimeFrame(state, smallestMts = 0) {
  const date = new Date()
  const now = date.getTime()
  let start
  let end = now

  const timeRange = getTimeRange(state)

  switch (timeRange.range) {
    case TIME_RANGE_LAST_24HOURS:
      start = now - DAY
      break
    case TIME_RANGE_PAST_MONTH:
      date.setMonth(date.getMonth() - 1)
      start = date.getTime()
      break
    case TIME_RANGE_PAST_3MONTH:
      date.setMonth(date.getMonth() - 3)
      start = date.getTime()
      break
    case TIME_RANGE_CUSTOM:
      /* eslint-disable prefer-destructuring */
      start = timeRange.start
      end = timeRange.end
      /* eslint-enable prefer-destructuring */
      break
    case TIME_RANGE_LAST_2WEEKS:
    default:
      start = now - WEEKS_2
      break
  }

  return {
    start,
    end: smallestMts > 0 ? smallestMts : end,
  }
}

export default {
  getTimeRange,
  getTimeFrame,
}
