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
    apiKey: state.auth.apiKey,
    apiSecret: state.auth.apiSecret,
  }
}

export function getTimeFrame() {
  // TODO: implement as a selector and move into state/query
  // const shift = 2 * 7 * 24 * 60 * 60; // 2 weeks
  const now = (new Date()).getTime()
  return {
    start: 0,
    end: now,
    limit: 25,
  }
}

export default {
  getTimeFrame,
  postJsonfetch,
  selectAuth,
}
