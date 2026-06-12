// Static config files to tune components

const { REACT_APP_ENV } = process.env

const environments = {
  development: {
    API_URL: 'http://localhost:31339/api',
    KEY_URL: 'https://setting.bitfinex.com/api',
    HOME_URL: 'http://localhost:3000',
    WS_ADDRESS: 'ws://127.0.0.1:31339/ws',
    // captcha is validated by production BFX in local framework mode
    pubApiUrl: 'api-pub.bitfinex.com',
    recaptchaSiteKey: '6LdXxyQqAAAAAIF-uEz8bkTJfalctad7h_TUxQDM',
    hcaptchaSiteKey: '4674d299-d095-4b1a-8638-3443251be2d9',
    localExport: true,
    showAuthPage: true,
    showFrameworkMode: true,
    hostedFrameworkMode: false,
  },
  testing: {
    API_URL: 'https://bfx-report-ui.staging.bitfinex.com/api',
    KEY_URL: 'https://bfx-ui-settings.staging.bitfinex.com/api',
    HOME_URL: 'https://staging.bitfinex.com',
    WS_ADDRESS: 'ws://127.0.0.1:31339/ws',
    pubApiUrl: 'api-pub.staging.bitfinex.com',
    recaptchaSiteKey: '6LfF-CIqAAAAABSz1LfAqS2aoYu6qU5vELK-sxGu',
    hcaptchaSiteKey: '37fd727e-9e13-413f-9a5b-5af463596c2',
    localExport: false,
    showAuthPage: true,
    showFrameworkMode: false,
    hostedFrameworkMode: false,
  },
  staging: {
    API_URL: 'https://bfx-report-ui.staging.bitfinex.com/api',
    KEY_URL: 'https://bfx-ui-settings.staging.bitfinex.com/api',
    HOME_URL: 'https://staging.bitfinex.com',
    WS_ADDRESS: 'ws://127.0.0.1:31339/ws',
    pubApiUrl: 'api-pub.staging.bitfinex.com',
    recaptchaSiteKey: '6LfF-CIqAAAAABSz1LfAqS2aoYu6qU5vELK-sxGu',
    hcaptchaSiteKey: '37fd727e-9e13-413f-9a5b-5af463596c2',
    localExport: false,
    showAuthPage: true,
    showFrameworkMode: false,
    hostedFrameworkMode: false,
  },
  production: {
    API_URL: 'https://report.bitfinex.com/api',
    KEY_URL: 'https://setting.bitfinex.com/api',
    HOME_URL: 'https://trading.bitfinex.com/t',
    WS_ADDRESS: 'ws://127.0.0.1:31339/ws',
    pubApiUrl: 'api-pub.bitfinex.com',
    recaptchaSiteKey: '6LdXxyQqAAAAAIF-uEz8bkTJfalctad7h_TUxQDM',
    hcaptchaSiteKey: '4674d299-d095-4b1a-8638-3443251be2d9',
    localExport: false,
    showAuthPage: false,
    showFrameworkMode: false,
    hostedFrameworkMode: false,
  },
}

const environmentConfig = environments[REACT_APP_ENV] || {}

const config = {
  isElectronApp: false,
  ...environmentConfig,
}

export default config
