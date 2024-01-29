import _endsWith from 'lodash/endsWith'
import _find from 'lodash/find'
import _values from 'lodash/values'

export const DOMAINS = {
  default: 'bitfinex.com',
  tr: 'bitfinextr.com',
  com_tr: 'bitfinex.com.tr',
  br: 'bitfinexbr.com',
  jp: 'bitfinex.co.jp',
}

export const getBfxDomain = () => {
  if (typeof window === 'undefined') return DOMAINS.default

  const hostname = window.location?.hostname

  const domains = _values(DOMAINS)
  return _find(
    domains,
    (item) => _endsWith(hostname, item),
  ) || DOMAINS.default
}

export const getBfxEnvName = () => process.env.CI_ENVIRONMENT_NAME || process.env.REACT_APP_PROJECT_ENV || 'staging'

export const loggerLevels = (process.env.REACT_APP_LOGGER_LEVELS
  ? JSON.parse(process.env.REACT_APP_LOGGER_LEVELS) : ['error'])

export const bfxDomain = process.env.DOMAIN || getBfxDomain()

export const cookieDomain = process.env.REACT_APP_COOKIE_DOMAIN || bfxDomain
