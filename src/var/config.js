// Static config files to tune components
const platforms = {
  bitfinex: {
    API_URL: 'https://report.bitfinex.com/api',
    KEY_URL: 'https://www.bitfinex.com/api',
    HOME_URL: 'https://www.bitfinex.com',
    showAuthPage: false,
    showSyncMode: false,
    showFrameworkMode: false,
  },
  ethfinex: {
    API_URL: 'https://report.ethfinex.com/api',
    KEY_URL: 'https://www.ethfinex.com/api',
    HOME_URL: 'https://www.ethfinex.com',
    showAuthPage: false,
    showSyncMode: false,
    showFrameworkMode: false,
    hideSwitchTheme: true,
  },
  test: {
    API_URL: 'https://test-report.bitfinex.com/api',
    KEY_URL: 'https://test.bitfinex.com/api',
    HOME_URL: 'https://test.bitfinex.com',
    showAuthPage: true,
    showSyncMode: false,
    showFrameworkMode: false,
  },
  localhost: {
    API_URL: 'http://localhost:31339/api',
    KEY_URL: 'https://www.bitfinex.com/api',
    HOME_URL: 'http://localhost:3000',
    showAuthPage: true,
    showSyncMode: true,
    showFrameworkMode: true,
  },
}

Object.keys(platforms).forEach((platform) => {
  const { showSyncMode, showFrameworkMode } = platforms[platform]

  if (showFrameworkMode && !showSyncMode) {
    throw Error(`Sync mode should be enabled for platform ${platform}`)
  }
})

export const platformId = process.env.REACT_APP_PLATFORM || 'localhost'
export const platform = platforms[platformId] || {}
