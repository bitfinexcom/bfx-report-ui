import constants from './constants'

const {
  LAST_24HOURS,
  LAST_2WEEKS,
  PAST_MONTH,
  PAST_3MONTH,
  PAST_YEAR,
  PAST_2YEARS,
  CURRENT_YEAR,
  LAST_YEAR,
  CUSTOM,
} = constants

export const getTimeRange = state => state.timeRange

const makeDate = (action) => {
  const returnVal = new Date()
  action(returnVal)
  return returnVal.getTime()
}

export const getTimeFrameFromData = (data) => {
  const date = new Date()
  const now = date.getTime()
  let start
  let end = now

  const today = new Date()

  const pastDay = makeDate(d => d.setDate(d.getDate() - 1))
  const twoWeeksAgo = makeDate(d => d.setDate(d.getDate() - 14))
  const oneMonthAgo = makeDate(d => d.setMonth(d.getMonth() - 1))
  const threeMonthsAgo = makeDate(d => d.setMonth(d.getMonth() - 3))
  const oneYearAgo = makeDate(d => d.setFullYear(d.getFullYear() - 1))
  const twoYearsAgo = makeDate(d => d.setFullYear(d.getFullYear() - 2))

  const currentYearStart = new Date(today.getFullYear(), 0, 1).getTime()
  const lastYearStart = new Date(today.getFullYear() - 1, 0, 1).getTime()
  const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31, 23, 59, 59).getTime()

  switch (data.range) {
    case LAST_24HOURS:
      start = pastDay
      break
    case LAST_2WEEKS:
    default:
      start = twoWeeksAgo
      break
    case PAST_MONTH:
      start = oneMonthAgo
      break
    case PAST_3MONTH:
      start = threeMonthsAgo
      break
    case PAST_YEAR:
      start = oneYearAgo
      break
    case PAST_2YEARS:
      start = twoYearsAgo
      break
    case CURRENT_YEAR:
      start = currentYearStart
      break
    case LAST_YEAR:
      start = lastYearStart
      end = lastYearEnd
      break
    case CUSTOM:
      /* eslint-disable prefer-destructuring */
      start = data.start
      end = data.end
      /* eslint-enable prefer-destructuring */
      break
  }

  return {
    start,
    end: data.smallestMts > 0 ? data.smallestMts : end,
  }
}

/**
 * Selector to return query range (in milliseconds).
 * @param {object} state query state
 * @param {number} smallestMts timestamp of the last checked entry, used for pagination
 */
export const getTimeFrame = (state, smallestMts = 0) => {
  const timeRange = getTimeRange(state)
  return getTimeFrameFromData({ ...timeRange, smallestMts })
}

export default {
  getTimeRange,
  getTimeFrame,
  getTimeFrameFromData,
}
