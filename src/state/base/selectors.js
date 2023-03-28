import memoizeOne from 'memoize-one'
import _isNull from 'lodash/isNull'
import _isEqual from 'lodash/isEqual'

import config from 'config'
import { formatTime, timeOffset } from 'state/utils'

import types from './constants'

const { showFrameworkMode, API_URL, WS_ADDRESS } = config

export const getBase = state => state.base

export const getLocale = state => getBase(state).locale
export const getTheme = state => getBase(state).theme || types.DEFAULT_THEME
export const getTimezone = state => getBase(state).timezone
export const getDateFormat = state => getBase(state).dateFormat || types.DATE_FORMATS[0]
export const getShowMilliseconds = state => getBase(state).milliseconds || false
export const getTableScroll = state => getBase(state).tableScroll || false
export const getSrc = state => getBase(state)?.src ?? types.DEFAULT_SRC
export const getIsTurkishSite = state => _isEqual(getSrc(state), types.TR_SRC)
export const getCustomApiPort = state => getBase(state)?.customApiPort ?? null

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

export const getApiUrl = (state) => {
  const apiPort = getCustomApiPort(state)
  if (showFrameworkMode && !_isNull(apiPort)) {
    return `http://localhost:${apiPort}/api`
  }

  return API_URL
}

export default {
  getApiUrl,
  getBase,
  getCustomApiPort,
  getDateFormat,
  getFullTime,
  getIsTurkishSite,
  getLocale,
  getShowMilliseconds,
  getSrc,
  getTheme,
  getTimeOffset,
  getTimezone,
}
