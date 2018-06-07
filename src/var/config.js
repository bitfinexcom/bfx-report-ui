// Static config files to tune components
const platforms = {
  bitfinex: {
    Name: 'Bitfinex',
    API_URL: 'api.bitfinex.com',
  },
  ethfinex: {
    Name: 'Ethfinex',
    API_URL: 'api.ethfinex.com',
  },
  localhost: {
    Name: 'Bitfinex',
    API_URL: 'localhost:31339',
  },
}

export const platformId = process.env.REACT_APP_PLATFORM || 'bitfinex'
export const platform = platforms[platformId] || {}
export const baseUrl = 'http://localhost:31339'
