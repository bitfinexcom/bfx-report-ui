import moment from 'moment-timezone'
import queryString from 'query-string'
import memoizeOne from 'memoize-one'
import _omit from 'lodash/omit'
import _castArray from 'lodash/castArray'
import _get from 'lodash/get'
import _isEqual from 'lodash/isEqual'
import _sortBy from 'lodash/sortBy'

import { store } from 'state/store'
import { platform } from 'var/config'
import { getPath, TYPE_WHITELIST, ROUTE_WHITELIST } from 'state/query/utils'
import queryType from 'state/query/constants'
import {
  getSymbolsURL, formatPair, demapSymbols, demapPairs, mapSymbol, getMappedSymbolsFromUrl,
} from 'state/symbols/utils'
import { selectAuth } from 'state/auth/selectors'

const { REACT_APP_ELECTRON } = process.env

const {
  MENU_ACCOUNT_BALANCE,
  MENU_AFFILIATES_EARNINGS,
  MENU_CANDLES,
  MENU_DERIVATIVES,
  MENU_FCREDIT,
  MENU_FEES_REPORT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_FPAYMENT,
  MENU_LEDGERS,
  MENU_LOAN_REPORT,
  MENU_LOGINS,
  MENU_MOVEMENTS,
  MENU_ORDERS,
  MENU_POSITIONS,
  MENU_POSITIONS_AUDIT,
  MENU_PUBLIC_FUNDING,
  MENU_PUBLIC_TRADES,
  MENU_TICKERS,
  MENU_TRADED_VOLUME,
  MENU_TRADES,
} = queryType

export const getAuthFromStore = () => {
  const state = store.getState()
  return selectAuth(state)
}

// turned off for firefox
export const getDefaultTableScrollSetting = () => REACT_APP_ELECTRON || !navigator.userAgent.includes('Firefox')

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

export function makeFetchCall(method, params = undefined, auth = getAuthFromStore()) {
  return postJsonfetch(`${platform.API_URL}/json-rpc`, {
    auth,
    method,
    params: params || undefined,
  })
}

// used to check the working state of services dealing with export mailing
// response email should be added to export requests
// currently not used anywhere
export function checkEmail(auth = getAuthFromStore()) {
  return postJsonfetch(`${platform.API_URL}/check-stored-locally`, {
    auth,
  })
}

export const formatAuthDate = mts => moment(mts).format('M/D/YYYY, h:mm:ss A')

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

export function formatDate(mts, timezone, format = 'MMM DD YYYY') {
  if (timezone) {
    return moment(mts, 'x').tz(timezone).utcOffset('0').format(format)
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

export const checkInit = (props, type) => {
  const {
    dataReceived,
    pageLoading,
    fetchData,
    match,

    setTargetSymbol,
    setTargetSymbols,
    setTargetPair,
    setTargetPairs,
    targetIds,
    setTargetIds,
  } = props

  switch (type) {
    case MENU_PUBLIC_FUNDING: {
      if (!dataReceived && !pageLoading) {
        const symbol = (match.params && match.params.symbol) || ''
        if (symbol) {
          setTargetSymbol(getMappedSymbolsFromUrl(symbol)[0])
        }
        fetchData()
      }
      break
    }
    case MENU_PUBLIC_TRADES: {
      if (!dataReceived && !pageLoading) {
        const pair = (match.params && match.params.pair) || ''
        if (pair) {
          setTargetPair(getMappedSymbolsFromUrl(pair)[0])
        }
        fetchData()
      }
      break
    }
    case MENU_LEDGERS:
    case MENU_MOVEMENTS:
    case MENU_FOFFER:
    case MENU_FLOAN:
    case MENU_FCREDIT:
    case MENU_FPAYMENT:
    case MENU_AFFILIATES_EARNINGS:
    case MENU_LOAN_REPORT: {
      if (!dataReceived && !pageLoading) {
        const symbols = (match.params && match.params.symbol) || ''
        if (symbols) {
          setTargetSymbols(getMappedSymbolsFromUrl(symbols))
        }
        fetchData()
      }
      break
    }
    case MENU_TRADES:
    case MENU_ORDERS:
    case MENU_POSITIONS:
    case MENU_TICKERS:
    case MENU_DERIVATIVES:
    case MENU_TRADED_VOLUME:
    case MENU_FEES_REPORT: {
      if (!dataReceived && !pageLoading) {
        const pairs = (match.params && match.params.pair) || ''
        if (pairs) {
          setTargetPairs(getMappedSymbolsFromUrl(pairs))
        }
        fetchData()
      }
      break
    }
    case MENU_POSITIONS_AUDIT: {
      const ids = _get(match, 'params.id', '').split(',')

      const isIdChanged = !_isEqual(_sortBy(ids), _sortBy(targetIds))
      if (ids.length && ((!dataReceived && !pageLoading) || isIdChanged)) {
        setTargetIds(ids)
        fetchData()
      }
      break
    }
    case MENU_CANDLES: {
      if (!dataReceived && !pageLoading) {
        fetchData()
      }
      break
    }
    case MENU_LOGINS: {
      if (!dataReceived && !pageLoading) {
        fetchData()
      }
      break
    }
    case MENU_ACCOUNT_BALANCE: {
      if (!dataReceived && !pageLoading) {
        fetchData()
      }
      break
    }
    default:
  }
}

export function checkFetch(prevProps, props, type) {
  if (!isValidateType(type)) {
    return
  }
  const { dataReceived: prevDataReceived } = prevProps
  const { dataReceived, pageLoading, fetchData } = props
  if (!dataReceived && dataReceived !== prevDataReceived && !pageLoading) {
    fetchData()
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

  const path = _castArray(getPath(type))[0]
  return (symbols && symbols.length)
    ? `${path}/${getSymbolsURL(symbols)}${params}`
    : `${path}${params}`
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

  history.push(generateUrl(type, window.location.search, demapSymbols(nextSymbols)))
}

export function setPair(type, props, pair) {
  const {
    history, targetPair, setTargetPair,
  } = props

  if (targetPair !== pair) {
    setTargetPair(pair)
    history.push(generateUrl(type, window.location.search, demapPairs(pair)))
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
  history.push(generateUrl(type, window.location.search, demapPairs(nextPairs)))
}

export const getCurrentEntries = memoizeOne(
  (entries, page, pageSize) => entries.slice((page - 1) * pageSize, page * pageSize),
)

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
  getDefaultTableScrollSetting,
  getQueryWithoutParams,
  makeFetchCall,
  formatAuthDate,
  formatDate,
  formatTime,
  getAuthFromStore,
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
