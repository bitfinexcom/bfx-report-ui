import axios from 'axios'

import { corsProxyUrl } from '../var/platform'

const DEFAULT_REQUEST_HEADERS = {
  Accept: '*/*',
  'Content-Type': 'application/json;charset=UTF-8',
}

export const PUB_API_URL = 'api.bitfinex.com'

const createApiInstance = (baseURL) => axios.create({
  baseURL: `${corsProxyUrl}https:${baseURL}`,
  headers: DEFAULT_REQUEST_HEADERS,
})

export const pubApi = createApiInstance(`//${PUB_API_URL}`)

export const getIpInfo = (ip) => pubApi({
  method: 'get',
  url: '/v2/int/geo/ip',
  params: {
    ip,
  },
})
