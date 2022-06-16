import constants from './constants'

const {
  DATE,
  CUSTOM,
} = constants

export const getGoToRange = state => state.goToRange
export const getIsGoToRangePreserved = state => getGoToRange(state).isTimeRangePreserved

const makeDate = (action) => {
  const returnVal = new Date()
  action(returnVal)
  return returnVal.getTime()
}

export const getGoToRangeFromData = (data) => {
  const date = new Date()
  const now = date.getTime()
  let start
  let end = now

  // const today = new Date()

  const pastDay = makeDate(d => d.setDate(d.getDate() - 1))
  // const twoWeeksAgo = makeDate(d => d.setDate(d.getDate() - 14))
  // const oneMonthAgo = makeDate(d => d.setMonth(d.getMonth() - 1))
  // const threeMonthsAgo = makeDate(d => d.setMonth(d.getMonth() - 3))
  // const oneYearAgo = makeDate(d => d.setFullYear(d.getFullYear() - 1))
  // const twoYearsAgo = makeDate(d => d.setFullYear(d.getFullYear() - 2))

  // const currentYearStart = new Date(today.getFullYear(), 0, 1).getTime()
  // const lastYearStart = new Date(today.getFullYear() - 1, 0, 1).getTime()
  // const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31, 23, 59, 59).getTime()

  switch (data.range) {
    default:
    case DATE:
      start = data?.start
      end = data?.end
      break
    case CUSTOM:
      /* eslint-disable prefer-destructuring */
      start = data?.start
      end = data?.end
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
export const getRange = (state, smallestMts = 0) => {
  const timeRange = getGoToRange(state)
  return getGoToRangeFromData({ ...timeRange, smallestMts })
}

export default {
  getIsGoToRangePreserved,
  getRange,
  getGoToRange,
  getGoToRangeFromData,
}
