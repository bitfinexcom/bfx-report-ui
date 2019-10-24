import { formatTime, timeOffset } from 'state/utils'

import types from './constants'

export const getBase = state => state.base

export const getApiKey = state => getBase(state).apiKey
export const getApiSecret = state => getBase(state).apiSecret
export const getAuthToken = state => getBase(state).authToken
export const getSyncState = state => getBase(state).isSyncEnabled
export const getLocale = state => getBase(state).locale
export const getMenuMode = state => getBase(state).menuMode
export const getTheme = state => getBase(state).theme || types.DEFAULT_THEME
export const getTimezone = state => getBase(state).timezone
export const getInputTimezone = state => getBase(state).inputTimezone
export const getDateFormat = state => getBase(state).dateFormat || types.DATE_FORMATS[0]
export const getShowMilliseconds = state => getBase(state).milliseconds || false
export const getBaseQueryLimit = state => getBase(state).queryLimit || types.DEFAULT_BASE_QUERY_LIMIT

export const getFullTime = state => (mts, full, inputTime = false) => (mts ? formatTime(mts, {
  timezone: inputTime ? getInputTimezone(state) : getTimezone(state),
  dateFormat: getDateFormat(state),
  milliseconds: getShowMilliseconds(state),
  full,
}) : '')
export const getTimeOffset = state => timeOffset(getTimezone(state))

export default {
  getBase,
  getApiKey,
  getApiSecret,
  getAuthToken,
  getSyncState,
  getDateFormat,
  getFullTime,
  getLocale,
  getMenuMode,
  getBaseQueryLimit,
  getShowMilliseconds,
  getTheme,
  getTimeOffset,
  getTimezone,
  getInputTimezone,
}
