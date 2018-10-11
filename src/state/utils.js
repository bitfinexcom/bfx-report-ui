import moment from 'moment-timezone'

import { platform } from 'var/config'

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

export function formatTime(mts, timezone) {
  if (timezone) {
    return moment(mts, 'x').tz(timezone).format('YY-MM-DD HH:mm:ss')
  }
  return moment(mts, 'x').format('YY-MM-DD HH:mm:ss')
}

export function formatDate(mts, timezone) {
  // MMM dd yyyy
  if (timezone) {
    return moment(mts, 'x').tz(timezone).utcOffset('0').format('MMM DD YYYY')
      .toUpperCase()
  }
  return moment(mts, 'x').format('MMM DD YYYY').toUpperCase()
}

// tBTCUSD -> btcusd
export function formatInternalPair(symbol) {
  return `${symbol.slice(1).toLowerCase()}`
}

// tBTCUSD -> BTC/USD
export function formatSymbolToPair(symbol) {
  return `${symbol.slice(1, 4)}/${symbol.slice(4, 7)}`
}

// btcusd -> BTC/USD
export function formatPair(pair) {
  if (!pair || pair === 'ALL') {
    return 'ALL'
  }
  return `${pair.slice(0, 3).toUpperCase()}/${pair.slice(3, 6).toUpperCase()}`
}

// btcusd -> tBTCUSD
export function formatRawPairToTPair(pair) {
  return `t${pair.toUpperCase()}`
}

// USD -> fUSD
export function formatRawSymbolToFSymbol(symbol) {
  return `f${symbol.toUpperCase()}`
}

const TYPE_WHITELIST = [
  'fcredit',
  'floan',
  'foffer',
  'ledgers',
  'movements',
  'orders',
  'trades',
]

export function isValidateType(type) {
  return TYPE_WHITELIST.includes(type)
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

export function getDefaultTimezone() {
  return moment.tz.guess()
}

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

export default {
  checkFetch,
  checkEmail,
  makeFetchCall,
  formatDate,
  formatInternalPair,
  formatPair,
  formatRawPairToTPair,
  formatRawSymbolToFSymbol,
  formatSymbolToPair,
  formatTime,
  getAuth,
  getCurrentEntries,
  getDefaultTimezone,
  getSideMsg,
  isValidateType,
  momentFormatter,
  postJsonfetch,
}
