import memoizeOne from 'memoize-one'

import { formatTime, timeOffset } from 'state/utils'

import types from './constants'

export const getBase = state => state.base

export const getApiKey = state => getBase(state).apiKey
export const getApiSecret = state => getBase(state).apiSecret
export const getAuthToken = state => getBase(state).authToken
export const getLocale = state => getBase(state).locale
export const getTheme = state => getBase(state).theme || types.DEFAULT_THEME
export const getTimezone = state => getBase(state).timezone
export const getInputTimezone = state => getBase(state).inputTimezone
export const getDateFormat = state => getBase(state).dateFormat || types.DATE_FORMATS[0]
export const getShowMilliseconds = state => getBase(state).milliseconds || false

export const getTimeOffset = state => timeOffset(getTimezone(state))

const getFormattedTime = (inputTimezone, timezone, dateFormat, milliseconds) => (mts, full, inputTime = false) => {
  if (!mts) {
    return ''
  }

  const options = {
    timezone: inputTime ? inputTimezone : timezone,
    dateFormat,
    milliseconds,
    full,
  }
  return formatTime(mts, options)
}

const getFormattedTimeMemo = memoizeOne(getFormattedTime)

export const getFullTime = (state) => {
  const inputTimezone = getInputTimezone(state)
  const timezone = getTimezone(state)
  const dateFormat = getDateFormat(state)
  const milliseconds = getShowMilliseconds(state)

  return getFormattedTimeMemo(inputTimezone, timezone, dateFormat, milliseconds)
}

export default {
  getBase,
  getApiKey,
  getApiSecret,
  getAuthToken,
  getDateFormat,
  getFullTime,
  getLocale,
  getShowMilliseconds,
  getTheme,
  getTimeOffset,
  getTimezone,
  getInputTimezone,
}
