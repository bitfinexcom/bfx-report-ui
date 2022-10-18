import memoizeOne from 'memoize-one'

import { formatTime, timeOffset } from 'state/utils'

import types from './constants'

export const getBase = state => state.base

export const getLocale = state => getBase(state).locale
export const getTheme = state => getBase(state).theme || types.DEFAULT_THEME
export const getTimezone = state => getBase(state).timezone
export const getDateFormat = state => getBase(state).dateFormat || types.DATE_FORMATS[0]
export const getShowMilliseconds = state => getBase(state).milliseconds || false
export const getTableScroll = state => getBase(state).tableScroll || false
export const getSrc = state => getBase(state)?.src ?? types.DEFAULT_SRC

export const getTimeOffset = state => timeOffset(getTimezone(state))

const getFormattedTime = (timezone, dateFormat, milliseconds) => (mts, full) => {
  if (!mts) {
    return ''
  }

  const options = {
    timezone,
    dateFormat,
    milliseconds,
    full,
  }
  return formatTime(mts, options)
}

const getFormattedTimeMemo = memoizeOne(getFormattedTime)

export const getFullTime = (state) => {
  const timezone = getTimezone(state)
  const dateFormat = getDateFormat(state)
  const milliseconds = getShowMilliseconds(state)

  return getFormattedTimeMemo(timezone, dateFormat, milliseconds)
}

export default {
  getBase,
  getDateFormat,
  getFullTime,
  getLocale,
  getShowMilliseconds,
  getSrc,
  getTheme,
  getTimeOffset,
  getTimezone,
}
