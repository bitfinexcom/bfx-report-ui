import moment from 'moment'
import queryString from 'query-string'
import _omit from 'lodash/omit'

import { platform } from 'var/config'
import { getPath } from 'state/query/utils'
import { getSymbolsURL } from 'state/symbols/utils'

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

const TYPE_WHITELIST = [
  'fcredit',
  'floan',
  'foffer',
  'ledgers',
  'movements',
  'orders',
  'trades',
  'publictrades',
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

// genereate url with route and params
export function generateUrl(type, params, symbols) {
  if (!isValidateType(type)) {
    // eslint-disable-next-line no-console
    console.error('Unsupport type')
    return ''
  }
  return symbols
    ? `${getPath(type)}/${getSymbolsURL(symbols)}${params}`
    : `${getPath(type)}${params}`
}

export default {
  checkFetch,
  checkEmail,
  makeFetchCall,
  formatDate,
  formatTime,
  getAuth,
  getCurrentEntries,
  getNoAuthTokenUrlString,
  getParsedUrlParams,
  getSideMsg,
  generateUrl,
  isValidateType,
  momentFormatter,
  postJsonfetch,
}
