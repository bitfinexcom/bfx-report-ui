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
  // TODO: support local GMT time by preference
  //  new Date(mts).toLocaleString()
  const date = new Date(mts)
  // 18-07-06 02:08:02
  return `${date.getFullYear() % 100}-${_padStart(date.getMonth() + 1, 2, 0)}-${_padStart(date.getDate(), 2, 0)} ${_padStart(date.getHours(), 2, 0)}:${_padStart(date.getMinutes(), 2, 0)}:${_padStart(date.getSeconds(), 2, 0)}`
}

const monthstr = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

export function formatDate(mts) {
  const date = new Date(mts)
  // MMM dd yyyy
  return `${monthstr[date.getMonth()]} ${_padStart(date.getDate(), 2, 0)} ${date.getFullYear()}`
}

export default {
  formatDate,
  formatTime,
  postJsonfetch,
  selectAuth,
}
