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
  return new Date(mts).toLocaleString()
}

export function formatDate(mts) {
  const date = new Date(mts)
  // yyyy MM dd
  return `${date.getFullYear()} ${date.getMonth() + 1} ${date.getDate()}`
}

export default {
  formatDate,
  formatTime,
  postJsonfetch,
  selectAuth,
}
