import moment from 'moment-timezone'
import queryString from 'query-string'
import _omit from 'lodash/omit'
import memoizeOne from 'memoize-one'

import { platform } from 'var/config'
import { getPath, TYPE_WHITELIST, ROUTE_WHITELIST } from 'state/query/utils'
import { getSymbolsURL, demapSymbols, demapPairs } from 'state/symbols/utils'

export function postJsonfetch(url, bodyJson) {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyJson),
  })
    .then(response => response.json())
    .catch(error => error)
    .then(data => data)
}

export function makeFetchCall(method, auth = null, params = null) {
  return postJsonfetch(`${platform.API_URL}/get-data`, {
    auth,
    method,
    params,
  })
}

export function getAuth(auth) {
  return postJsonfetch(`${platform.API_URL}/check-auth`, {
    auth,
  })
}

export function checkEmail(auth) {
  return postJsonfetch(`${platform.API_URL}/check-stored-locally`, {
    auth,
  })
}
/**
 * Format time.
 * @param {number} mts timestamp
 * @param {Object} options pass `timezone` to format time with the right timezone;
 *   set `full: true` to show 4 digits year;
 *   set `milliseconds: true` to show milliseconds;
 *   set `dateFormat: 'YY-MM-DD` to custom the date format.
 */
export function formatTime(mts, {
  dateFormat,
  full,
  milliseconds,
  timezone,
}) {
  const baseFormat = dateFormat
    ? `${dateFormat} HH:mm:ss`
    : 'YY-MM-DD HH:mm:ss'
  const normalFormat = full ? baseFormat.replace('YY', 'YYYY') : baseFormat
  const format = milliseconds ? `${normalFormat} SSS` : normalFormat
  return timezone
    ? moment(mts, 'x').tz(timezone).format(format)
    : moment(mts, 'x').format(format)
}

export function formatDate(mts, timezone) {
  // MMM dd yyyy
  if (timezone) {
    return moment(mts, 'x').tz(timezone).utcOffset('0').format('MMM DD YYYY')
      .toUpperCase()
  }
  return moment(mts, 'x').format('MMM DD YYYY').toUpperCase()
}

export function timeOffset(timezone) {
  return timezone
    ? moment.tz(timezone).format('Z')
    : moment.tz(moment.tz.guess()).format('Z')
}

export function isValidateType(type) {
  return TYPE_WHITELIST.includes(type)
}

export function isValidRouteType(type) {
  return ROUTE_WHITELIST.includes(type)
}

export function checkFetch(prevProps, props, type) {
  if (!isValidateType(type)) {
    return
  }
  const { loading: prevLoading } = prevProps
  const { loading } = props
  // eslint-disable-next-line react/destructuring-assignment
  const fetch = props[`fetch${type.charAt(0).toUpperCase() + type.slice(1)}`]
  if (loading && loading !== prevLoading) {
    fetch()
  }
}

// remove authToken param from url but keep others
export function getNoAuthUrlString(searchUrl) {
  const parsed = queryString.parse(searchUrl)
  const params = _omit(parsed, ['authToken', 'apiKey', 'apiSecret'])
  const queries = queryString.stringify(params, { encode: false })
  return queries ? `?${queries}` : ''
}

// genereate url with route and params
export function generateUrl(type, params, symbols) {
  if (!isValidRouteType(type)) {
    // eslint-disable-next-line no-console
    console.error('Unsupport route type ', type)
    return ''
  }
  const noAuthTokenParams = getNoAuthUrlString(params)
  return (symbols && symbols.length)
    ? `${getPath(type)}/${getSymbolsURL(symbols)}${noAuthTokenParams}`
    : `${getPath(type)}${noAuthTokenParams}`
}

export function toggleSymbol(type, props, symbol) {
  const {
    history, targetSymbols, addTargetSymbol, removeTargetSymbol,
  } = props

  let nextSymbols

  if (!targetSymbols.includes(symbol)) {
    nextSymbols = [...targetSymbols, symbol]
    addTargetSymbol(symbol)
  } else {
    nextSymbols = targetSymbols.filter(tag => symbol !== tag)
    removeTargetSymbol(symbol)
  }

  history.push(generateUrl(type, history.location.search, demapSymbols(nextSymbols)))
}

export function togglePair(type, props, pair) {
  const {
    history, targetPairs, addTargetPair, removeTargetPair,
  } = props

  let nextPairs

  if (!targetPairs.includes(pair)) {
    nextPairs = [...targetPairs, pair]
    addTargetPair(pair)
  } else {
    nextPairs = targetPairs.filter(tag => pair !== tag)
    removeTargetPair(pair)
  }

  history.push(generateUrl(type, history.location.search, demapPairs(nextPairs)))
}

export function getCurrentEntries(entries, offset, limit, pageOffset, pageSize) {
  return offset < limit
    ? entries.slice(pageOffset, pageOffset + pageSize)
    : entries.slice(offset + pageOffset - limit, offset + pageOffset - limit + pageSize)
}

export function momentFormatter(format, timezone) {
  return timezone
    ? {
      formatDate: date => moment.tz(date, timezone).format(format),
      parseDate: str => moment.tz(str, format, timezone).toDate(),
      placeholder: `${format} (moment)`,
    }
    : {
      formatDate: date => moment(date).format(format),
      parseDate: str => moment(str, format).toDate(),
      placeholder: `${format} (moment)`,
    }
}

export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'
export const DEFAULT_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export const momentFormatterDays = () => ({
  formatDate: date => moment(date).format(DEFAULT_DATE_FORMAT),
  parseDate: str => moment.utc(str, 'YYYY-MM-DD 00:00:00').toDate(),
})


export function getSideMsg(side) {
  switch (side) {
    case 1:
      return 'provided'
    case 0:
      return 'both'
    case -1:
      return 'taken'
    default:
      return 'null'
  }
}

export function getParsedUrlParams(searchUrl) {
  return queryString.parse(searchUrl)
}

export default {
  checkFetch,
  checkEmail,
  DEFAULT_DATETIME_FORMAT,
  makeFetchCall,
  formatDate,
  formatTime,
  getAuth,
  getCurrentEntries,
  getNoAuthUrlString,
  getParsedUrlParams,
  getSideMsg,
  generateUrl,
  isValidateType,
  momentFormatter,
  momentFormatterDays,
  postJsonfetch,
  timeOffset: memoizeOne(timeOffset),
}
