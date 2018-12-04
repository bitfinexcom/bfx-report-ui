import { isValidateType } from 'state/utils'

import { getQueryLimit } from './utils'
import constants from './constants'

export const getQuery = state => state.query

export const getTimeRange = state => getQuery(state).timeRange
export const getEmail = state => getQuery(state).email
export const getExportEmail = state => getQuery(state).exportEmail
export const getPrepareExport = state => getQuery(state).prepareExport

/**
 * Selector to return query range (in milliseconds) and limit.
 * @param {object} state query state
 */
export function getTimeFrame(state = {}, type = '', smallestMts = 0) {
  const date = new Date()
  const now = date.getTime()
  let TIME_SHIFT
  let start
  let end = now
  const limit = isValidateType(type) ? getQueryLimit(type) : constants.DEFAULT_QUERY_LIMIT
  switch (state.timeRange) {
    case constants.TIME_RANGE_LAST_24HOURS:
      TIME_SHIFT = 1000 * 60 * 60 * 24 // 24 hours
      start = now - TIME_SHIFT
      break
    case constants.TIME_RANGE_YESTERDAY:
      date.setDate(date.getDate() - 1)
      date.setHours(0, 0)
      date.setMinutes(0, 0)
      start = date.getTime()
      break
    case constants.TIME_RANGE_MONTH_TO_DATE:
      date.setDate(1)
      date.setHours(0, 0)
      date.setMinutes(0, 0)
      start = date.getTime()
      break
    case constants.TIME_RANGE_PAST_MONTH:
      date.setMonth(date.getMonth() - 1)
      start = date.getTime()
      break
    case constants.TIME_RANGE_PAST_3MONTH:
      date.setMonth(date.getMonth() - 3)
      start = date.getTime()
      break
    case constants.TIME_RANGE_CUSTOM:
      /* eslint-disable prefer-destructuring */
      start = state.start
      end = state.end
      /* eslint-enable prefer-destructuring */
      break
    case constants.TIME_RANGE_LAST_2WEEKS:
    default:
      TIME_SHIFT = 1000 * 60 * 60 * 24 * 7 * 2 // 2 weeks
      start = now - TIME_SHIFT
      break
  }
  return {
    start,
    end: smallestMts > 0 ? smallestMts : end,
    limit,
  }
}

export default {
  getEmail,
  getExportEmail,
  getPrepareExport,
  getQuery,
  getTimeFrame,
  getTimeRange,
}
