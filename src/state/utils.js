import _padStart from 'lodash/padStart'

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

export function selectAuth(state) {
  // TODO: support apiAuthKey
  return {
    apiKey: state.base.apiKey,
    apiSecret: state.base.apiSecret,
  }
}

export function formatTime(mts) {
  const date = new Date(mts)
  // 18-07-06 02:08:02
  return `${date.getFullYear() % 100}-${_padStart(date.getMonth() + 1, 2, 0)}-${_padStart(date.getDate(), 2, 0)}
 ${_padStart(date.getHours(), 2, 0)}:${_padStart(date.getMinutes(), 2, 0)}:${_padStart(date.getSeconds(), 2, 0)}`
}

const MONTH_SYM = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

export function formatDate(mts) {
  const date = new Date(mts)
  // MMM dd yyyy
  return `${MONTH_SYM[date.getMonth()]} ${_padStart(date.getDate(), 2, 0)} ${date.getFullYear()}`
}

export function formatPair(symbol) {
  return `${symbol.slice(1, 4)}/${symbol.slice(4, 7)}`
}

export const TYPE_WHITELIST = [
  'ledgers',
  'movements',
  'orders',
  'trades',
]

export function checkFetch(prevProps, props, type) {
  if (!TYPE_WHITELIST.includes(type)) {
    // eslint-disable-next-line no-console
    console.warn(`${type} is not a valid type`)
    return
  }
  const { prevLoading } = prevProps
  const { loading } = props
  // eslint-disable-next-line react/destructuring-assignment
  const fetch = props[`fetch${type.charAt(0).toUpperCase() + type.slice(1)}`]
  if (loading && loading !== prevLoading) {
    fetch()
  }
}

export default {
  checkFetch,
  formatDate,
  formatPair,
  formatTime,
  postJsonfetch,
  selectAuth,
  TYPE_WHITELIST,
}
