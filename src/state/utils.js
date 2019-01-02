import moment from 'moment-timezone'
import queryString from 'query-string'
import _omit from 'lodash/omit'
import memoizeOne from 'memoize-one'

import { platform } from 'var/config'
import { getPath, TYPE_WHITELIST, ROUTE_WHITELIST } from 'state/query/utils'
import { getSymbolsURL, parsePairTag } from 'state/symbols/utils'

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

// genereate url with route and params
export function generateUrl(type, params, symbols) {
  if (!isValidRouteType(type)) {
    // eslint-disable-next-line no-console
    console.error('Unsupport route type ', type)
    return ''
  }
  return symbols
    ? `${getPath(type)}/${getSymbolsURL(symbols)}${params}`
    : `${getPath(type)}${params}`
}

export function handleAddSymbolFilter(type, symbol, props) {
  const { history, addTargetSymbol, targetSymbols } = props
  if (!targetSymbols.includes(symbol)) {
    history.push(generateUrl(type, history.location.search, [...targetSymbols, symbol]))
    addTargetSymbol(symbol)
  }
}

export function handleAddPairFilter(type, pair, props) {
  const { history, addTargetPair, targetPairs } = props
  if (!targetPairs.includes(pair)) {
    history.push(generateUrl(type, history.location.search, [...targetPairs, pair]))
    addTargetPair(pair)
  }
}

export function handleRemoveSymbolFilter(type, tag, props) {
  const { history, removeTargetSymbol, targetSymbols } = props
  if (targetSymbols.includes(tag)) {
    if (targetSymbols.length === 1) { // show no select symbol in url
      history.push(generateUrl(type, history.location.search))
    } else {
      history.push(generateUrl(type, history.location.search, targetSymbols.filter(symbol => symbol !== tag)))
    }
    removeTargetSymbol(tag)
  }
}

export function handleRemovePairFilter(type, tag, props) {
  const { history, removeTargetPair, targetPairs } = props
  const parsedTag = parsePairTag(tag)
  if (targetPairs.includes(parsedTag)) {
    if (targetPairs.length === 1) { // show no select symbol in url
      history.push(generateUrl(type, history.location.search))
    } else {
      history.push(generateUrl(type, history.location.search, targetPairs.filter(pair => pair !== parsedTag)))
    }
    removeTargetPair(parsedTag)
  }
}

export function getCurrentEntries(entries, offset, limit, pageOffset, pageSize) {
  return offset < limit
    ? entries.slice(pageOffset, pageOffset + pageSize)
    : entries.slice(offset + pageOffset - limit, offset + pageOffset - limit + pageSize)
}

export function momentFormatter(format) {
  return {
    formatDate: date => moment(date).format(format),
    parseDate: str => moment(str, format).toDate(),
    placeholder: `${format} (moment)`,
  }
}

export const DATE_FORMAT = momentFormatter('YYYY-MM-DD HH:mm:ss')

export function getSideMsg(side) {
  let msg
  if (side === 1) {
    msg = 'provided'
  } else if (side === 0) {
    msg = 'both'
  } else if (side === -1) {
    msg = 'taken'
  } else {
    msg = 'null'
  }
  return msg
}

export function getParsedUrlParams(searchUrl) {
  return queryString.parse(searchUrl)
}

// remove authToken param from url but keep others
export function getNoAuthTokenUrlString(searchUrl) {
  const parsed = queryString.parse(searchUrl)
  const params = _omit(parsed, 'authToken')
  const queries = queryString.stringify(params, { encode: false })
  return queries ? `?${queries}` : ''
}

export default {
  checkFetch,
  checkEmail,
  DATE_FORMAT,
  makeFetchCall,
  formatDate,
  formatTime,
  getAuth,
  getCurrentEntries,
  getNoAuthTokenUrlString,
  getParsedUrlParams,
  getSideMsg,
  generateUrl,
  handleAddPairFilter,
  handleAddSymbolFilter,
  handleRemovePairFilter,
  handleRemoveSymbolFilter,
  isValidateType,
  momentFormatter,
  postJsonfetch,
  timeOffset: memoizeOne(timeOffset),
}
