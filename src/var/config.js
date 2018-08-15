// Static config files to tune components
const platforms = {
  bitfinex: {
    id: 'bfx',
    Name: 'Bitfinex',
    API_URL: 'https://report.bitfinex.com/api',
    KEY_URL: 'https://www.bitfinex.com/api',
    showAuthPage: true,
  },
  ethfinex: {
    id: 'efx',
    Name: 'Ethfinex',
    API_URL: 'https://report.ethfinex.com/api',
    KEY_URL: 'https://www.ethfinex.com/api',
    showAuthPage: true,
  },
  test: {
    id: 'test',
    Name: 'Bitfinex Test',
    API_URL: 'https://test-report.bitfinex.com/api',
    KEY_URL: 'https://test.bitfinex.com/api',
    showAuthPage: true,
  },
  localhost: {
    id: 'local',
    Name: 'Bfx',
    API_URL: 'http://localhost:31339/api',
    KEY_URL: 'https://www.bitfinex.com/api',
    showAuthPage: true,
  },
}

export const platformId = process.env.REACT_APP_PLATFORM || 'localhost'
export const platform = platforms[platformId] || {}
