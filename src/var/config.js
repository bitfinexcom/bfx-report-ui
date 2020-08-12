// Static config files to tune components
const platforms = {
  bitfinex: {
    API_URL: 'https://report.bitfinex.com/api',
    KEY_URL: 'https://www.bitfinex.com/api',
    HOME_URL: 'https://www.bitfinex.com/t',
    MAIN_API_URL: 'https://api.bitfinex.com',
    WS_ADDRESS: 'ws://127.0.0.1:31339/ws',
    localExport: false,
    showAuthPage: false,
    showFrameworkMode: false,
  },
  test: {
    API_URL: 'https://bfx-report-ui.staging.bitfinex.com/api',
    KEY_URL: 'https://test.bitfinex.com/api',
    HOME_URL: 'https://test.bitfinex.com',
    MAIN_API_URL: 'https://api.bitfinex.com',
    WS_ADDRESS: 'ws://127.0.0.1:31339/ws',
    localExport: false,
    showAuthPage: true,
    showFrameworkMode: false,
  },
  localhost: {
    API_URL: 'http://localhost:31339/api',
    KEY_URL: 'https://www.bitfinex.com/api',
    HOME_URL: 'http://localhost:3000',
    MAIN_API_URL: 'https://api.bitfinex.com',
    WS_ADDRESS: 'ws://127.0.0.1:31339/ws',
    localExport: true,
    showAuthPage: true,
    showFrameworkMode: true,
  },
}

export const platformId = process.env.REACT_APP_PLATFORM || 'localhost'
export const platform = platforms[platformId] || {}
