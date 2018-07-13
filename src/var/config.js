// Static config files to tune components
const platforms = {
  bitfinex: {
    id: 'bfx',
    Name: 'Bitfinex',
    API_URL: 'https://api.bitfinex.com/api`',
    KEY_URL: 'https://www.bitfinex.com/api',
  },
  ethfinex: {
    id: 'efx',
    Name: 'Ethfinex',
    API_URL: 'https://api.ethfinex.com/api',
    KEY_URL: 'https://dev-prdn.bitfinex.com:2998/api',
  },
  localhost: {
    id: 'local',
    Name: 'Bfx',
    API_URL: 'http://localhost:31339/api',
    KEY_URL: 'https://dev-prdn.bitfinex.com:2998/api',
  },
}

export const platformId = process.env.REACT_APP_PLATFORM || 'localhost'
export const platform = platforms[platformId] || {}
