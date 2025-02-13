// Static config files to tune components

const { REACT_APP_ENV } = process.env

const environments = {
  development: {
    API_URL: 'http://localhost:34343/api',
    KEY_URL: 'https://setting.bitfinex.com/api/api',
    HOME_URL: 'https://bitfinex.com',
    WS_ADDRESS: 'ws://localhost:34343/ws',
    localExport: true,
    showAuthPage: true,
    showFrameworkMode: true,
    hostedFrameworkMode: false,
  },
  testing: {
    API_URL: 'http://localhost:34343/api',
    KEY_URL: 'https://setting.bitfinex.com/api/api',
    HOME_URL: 'https://bitfinex.com',
    WS_ADDRESS: 'ws://localhost:34343/ws',
    localExport: true,
    showAuthPage: true,
    showFrameworkMode: true,
    hostedFrameworkMode: false,
  },
  staging: {
    API_URL: 'http://localhost:34343/api',
    KEY_URL: 'https://setting.bitfinex.com/api/api',
    HOME_URL: 'https://bitfinex.com',
    WS_ADDRESS: 'ws://localhost:34343/ws',
    localExport: true,
    showAuthPage: true,
    showFrameworkMode: true,
    hostedFrameworkMode: false,
  },
  production: {
    API_URL: 'http://localhost:34343/api',
    KEY_URL: 'https://setting.bitfinex.com/api/api',
    HOME_URL: 'https://bitfinex.com',
    WS_ADDRESS: 'ws://localhost:34343/ws',
    localExport: true,
    showAuthPage: true,
    showFrameworkMode: true,
    hostedFrameworkMode: false,
  },
}

const environmentConfig = environments[REACT_APP_ENV] || {}

const config = {
  isElectronApp: true,
  ...environmentConfig,
}

export default config
