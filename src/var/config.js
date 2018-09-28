// Static config files to tune components
const platforms = {
  bitfinex: {
    id: 'bfx',
    name: 'Bitfinex',
    API_URL: 'https://report.bitfinex.com/api',
    KEY_URL: 'https://www.bitfinex.com/api',
    showAuthPage: true,
    showSyncMode: false,
  },
  ethfinex: {
    id: 'efx',
    name: 'Ethfinex',
    API_URL: 'https://report.ethfinex.com/api',
    KEY_URL: 'https://www.ethfinex.com/api',
    showAuthPage: true,
    showSyncMode: false,
  },
  test: {
    id: 'test',
    name: 'Bitfinex Test',
    API_URL: 'https://test-report.bitfinex.com/api',
    KEY_URL: 'https://test.bitfinex.com/api',
    showAuthPage: true,
    showSyncMode: false,
  },
  localhost: {
    id: 'local',
    name: 'Local',
    API_URL: 'http://localhost:31339/api',
    KEY_URL: 'https://www.bitfinex.com/api',
    showAuthPage: true,
    showSyncMode: true,
  },
}

export const platformId = process.env.REACT_APP_PLATFORM || 'localhost'
export const platform = platforms[platformId] || {}
