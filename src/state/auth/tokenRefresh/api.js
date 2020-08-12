import { platform } from 'var/config'

const api = (options) => {
  const {
    data, method, url, authToken,
  } = options
  return fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'bfx-token': authToken,
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .catch(error => error)
}

export const restAuthTokenRequest = (authToken) => api({
  data: {
    scope: 'tks',
    writePermission: false,
    ttl: 3600,
    _cust_ip: 0,
    allow_write: false,
  },
  method: 'post',
  url: `${platform.MAIN_API_URL}/v2/auth/w/token`,
  authToken,
})

export default {
  restAuthTokenRequest,
}
