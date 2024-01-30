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

export const COOKIES = {
  FORCE_LOGIN: 'bfx_force_login',
  FORCE_LOGIN_MESSAGE: 'bfx_force_login_message',
  MAINTENCE_NOTICE_ID: 'bfx_maintenance_id',
  WELCOME_MESSAGE_COOKIE: 'new_login_session',
  PROHIBITED_PERSON_COOKIE: 'ask_if_prohibited',
  LAST_PROHIBITED_WARN_COOKIE: 'last_prohibited_warn',
  BOARD_SESSION: '__bfx_board_session',
  NOTIFY_RESTRICTED_BY_VER_LEVEL: 'bfx_notify_restricted_level',
  COOKIE_BANNER_DATA: 'bfx_cookie_banner_data',
  COOKIE_BANNER_TIMESTAMP: 'bfx_cookie_banner_timestamp',
  COOKIE_COUNTRY_RULE: 'bfx_cookies_country_rule',
  UK_USERS_WARNED: 'bfx_uk_users_warned',
}

export const COUNTRY_CODES = {
  ARGENTINA: 'AR',
  BRAZIL: 'BR',
  CHILE: 'CL',
  COLOMBIA: 'CO',
  PERU: 'PE',
  EL_SALVADOR: 'SV',
  MEXICO: 'MX',
  POLAND: 'PL',
  TURKEY: 'TR',
  VENEZUELA: 'VE',
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

export const corsProxyUrl = process.env.REACT_APP_CORS_PROXY_URL || ''
