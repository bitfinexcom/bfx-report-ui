// Static config files to tune components
const platforms = {
  bitfinex: {
    API_URL: 'https://report.bitfinex.com/api',
    KEY_URL: 'https://www.bitfinex.com/api',
    showAuthPage: false,
    showSyncMode: false,
  },
  ethfinex: {
    API_URL: 'https://report.ethfinex.com/api',
    KEY_URL: 'https://www.ethfinex.com/api',
    showAuthPage: false,
    showSyncMode: false,
    hideSwitchTheme: true,
  },
  test: {
    API_URL: 'https://test-report.bitfinex.com/api',
    KEY_URL: 'https://test.bitfinex.com/api',
    showAuthPage: true,
    showSyncMode: false,
  },
  localhost: {
    API_URL: 'http://localhost:31339/api',
    KEY_URL: 'https://www.bitfinex.com/api',
    showAuthPage: true,
    showSyncMode: false,
  },
}

export const platformId = process.env.REACT_APP_PLATFORM || 'localhost'
export const platform = platforms[platformId] || {}
