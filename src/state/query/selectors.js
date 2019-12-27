import { getBaseQueryLimit } from 'state/base/selectors'

import { canChangeQueryLimit, getQueryLimit } from './utils'
import constants from './constants'

const {
  TIME_RANGE_LAST_24HOURS,
  TIME_RANGE_PAST_MONTH,
  TIME_RANGE_PAST_3MONTH,
  TIME_RANGE_CUSTOM,
  TIME_RANGE_LAST_2WEEKS,
} = constants

export const getQuery = state => state.query

export const getTimeRange = state => getQuery(state).timeRange
export const getEmail = state => getQuery(state).email
export const getExportEmail = state => getQuery(state).exportEmail
export const getPrepareExport = state => getQuery(state).prepareExport
/**
 * Selector to return query limit by type.
 * Some section allow user custom query limit.
 * @param {object} state query state
 * @param {string} target section
 */
export const getTargetQueryLimit = (state, target) => (canChangeQueryLimit(target)
  ? getBaseQueryLimit(state)
  : getQueryLimit(target))

/**
 * Selector to return query range (in milliseconds) and limit.
 * @param {object} state query state
 * @param {number} smallestMts timestamp of the last checked entry, used for pagination
 */
export function getTimeFrame(state, smallestMts = 0) {
  const date = new Date()
  const now = date.getTime()
  let TIME_SHIFT
  let start
  let end = now
  switch (state.timeRange) {
    case TIME_RANGE_LAST_24HOURS:
      TIME_SHIFT = 1000 * 60 * 60 * 24 // 24 hours
      start = now - TIME_SHIFT
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
      start = state.start
      end = state.end
      /* eslint-enable prefer-destructuring */
      break
    case TIME_RANGE_LAST_2WEEKS:
    default:
      TIME_SHIFT = 1000 * 60 * 60 * 24 * 7 * 2 // 2 weeks
      start = now - TIME_SHIFT
      break
  }
  return {
    start,
    end: smallestMts > 0 ? smallestMts : end,
  }
}

export default {
  getEmail,
  getExportEmail,
  getPrepareExport,
  getQuery,
  getTargetQueryLimit,
  getTimeFrame,
  getTimeRange,
}
