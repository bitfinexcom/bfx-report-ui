import moment from 'moment-timezone'
import queryString from 'query-string'
import memoizeOne from 'memoize-one'
import _omit from 'lodash/omit'
import _castArray from 'lodash/castArray'

import { store } from 'state/store'
import { platform } from 'var/config'
import { getPath, TYPE_WHITELIST, ROUTE_WHITELIST } from 'state/query/utils'
import {
  getSymbolsURL, formatPair, demapSymbols, demapPairs, mapSymbol,
} from 'state/symbols/utils'
import { selectAuth } from 'state/auth/selectors'

const getAuthFromStore = () => {
  const state = store.getState()
  return selectAuth(state)
}

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

export function makeFetchCall(method, params = null, auth = getAuthFromStore()) {
  return postJsonfetch(`${platform.API_URL}/get-data`, {
    auth,
    method,
    params,
  })
}

export function getAuth(auth = getAuthFromStore()) {
  return postJsonfetch(`${platform.API_URL}/check-auth`, {
    auth,
  })
}

export function checkEmail(auth = getAuthFromStore()) {
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
  if (!moment(mts).isValid()) {
    return ''
  }

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

export function getLastMonth() {
  const date = new Date()
  date.setMonth(date.getMonth() - 1)

  return date.getTime()
}

export const isValidTimezone = timezone => !!moment.tz.zone(timezone)

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

export const concatQueryStrings = (...args) => {
  const queryStrings = _castArray(args)
  const result = queryStrings.reduce((acc, query) => {
    if (!query) {
      return acc
    }

    const params = query[0] === '?' ? query.substr(1) : query

    return acc ? `${acc}&${params}` : params
  }, '')

  return result && `?${result}`
}

export const getQueryWithoutParams = (params) => {
  const arrayParams = _castArray(params)
  const currentUrlParams = window.location.search
  const updatedParams = _omit(queryString.parse(currentUrlParams), arrayParams)
  const nextUrlParams = queryString.stringify(updatedParams, { encode: false })

  return nextUrlParams ? `?${nextUrlParams}` : ''
}

export const removeUrlParams = (params) => {
  const { search } = window.location
  const updatedQuery = getQueryWithoutParams(params)

  window.history.replaceState(null, null, window.location.href.replace(search, updatedQuery))
}

// genererate url with route and params
export function generateUrl(type, params, symbols) {
  if (!isValidRouteType(type)) {
    // eslint-disable-next-line no-console
    console.error('Unsupported route type ', type)
    return ''
  }
  return (symbols && symbols.length)
    ? `${getPath(type)}/${getSymbolsURL(symbols)}${params}`
    : `${getPath(type)}${params}`
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

export function setPair(type, props, pair) {
  const {
    history, targetPair, setTargetPair,
  } = props

  if (targetPair !== pair) {
    setTargetPair(pair)
    history.push(generateUrl(type, history.location.search, demapPairs(pair)))
  }
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

export const getFrameworkPositionsEntries = entries => entries.map((entry) => {
  const {
    actualPrice,
    amount,
    basePrice,
    id,
    leverage,
    marginFunding,
    marginFundingType,
    mtsCreate,
    mtsUpdate,
    pl,
    plUsd,
    plPerc,
    liquidationPrice,
    status,
    symbol,
  } = entry

  return {
    id,
    pair: formatPair(symbol),
    actualPrice,
    amount,
    basePrice,
    leverage,
    marginFunding,
    marginFundingType,
    mtsCreate,
    mtsUpdate,
    pl,
    plUsd,
    plPerc,
    liquidationPrice,
    status,
  }
})

export const getFrameworkPositionsTickersEntries = entries => entries.map((entry) => {
  const {
    symbol,
    amount,
  } = entry

  return {
    pair: formatPair(symbol),
    amount,
  }
})

export const getWalletsTickersEntries = entries => entries.map((entry) => {
  const {
    walletType,
    symbol,
    amount,
  } = entry

  return {
    walletType,
    pair: formatPair(symbol),
    amount,
  }
})

export const getWalletsEntries = entries => entries.map((entry) => {
  const {
    type,
    currency,
    balance,
    balanceUsd,
  } = entry

  return {
    type,
    currency: mapSymbol(currency),
    balance,
    balanceUsd,
  }
}).sort((a, b) => a.currency.localeCompare(b.currency))

export default {
  checkFetch,
  checkEmail,
  DEFAULT_DATETIME_FORMAT,
  getQueryWithoutParams,
  makeFetchCall,
  formatDate,
  formatTime,
  getAuth,
  getCurrentEntries,
  getLastMonth,
  getParsedUrlParams,
  getSideMsg,
  generateUrl,
  isValidTimezone,
  isValidateType,
  momentFormatter,
  momentFormatterDays,
  postJsonfetch,
  removeUrlParams,
  getFrameworkPositionsEntries,
  getFrameworkPositionsTickersEntries,
  getWalletsTickersEntries,
  getWalletsEntries,
  timeOffset: memoizeOne(timeOffset),
}
