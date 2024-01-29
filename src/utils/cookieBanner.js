import _split from 'lodash/split'
import _get from 'lodash/get'
import _join from 'lodash/join'
import _includes from 'lodash/includes'
import _filter from 'lodash/filter'

import {
  setCookie,
  getCookieValue,
} from './browser'
import { COOKIES } from '../var/platform'
import { COUNTRY_CODES } from '../../var/locales'
import { getIpInfo } from '../../api/conf'

export const COOKIES_GROUP_NECESSARY = 'necessary'
export const COOKIES_GROUP_ANALYTICAL = 'analytical'

export const COOKIE_GROUPS_LIST = [
  COOKIES_GROUP_NECESSARY,
  COOKIES_GROUP_ANALYTICAL,
]

const COOKIES_EXPIRES_PERIOD_DAYS = 90
const REFRESH_DATA_PERIOD = 1000 * 60 * 60 * 24 * COOKIES_EXPIRES_PERIOD_DAYS

const COOKIE_GROUPS_SEPARATOR = ','

const RULE_ALLOW_COOKIES = 'allow_cookies'
const RULE_BANNER_REQUIRED = 'banner_required'

const COUNTRIES_COOKIES_ALLOWED = [
  COUNTRY_CODES.ARGENTINA,
  COUNTRY_CODES.BRAZIL,
  COUNTRY_CODES.CHILE,
  COUNTRY_CODES.COLOMBIA,
  COUNTRY_CODES.PERU,
  COUNTRY_CODES.EL_SALVADOR,
  COUNTRY_CODES.MEXICO,
  COUNTRY_CODES.TURKEY,
]

const getCookiesCountryRuleByIp = async () => {
  let value = getCookieValue(COOKIES.COOKIE_COUNTRY_RULE)
  if (value) {
    return value
  }

  try {
    const isStaging = process.env.CI_ENVIRONMENT_NAME === 'staging'
    const urlCountryCode = typeof window !== 'undefined'
      && new URL(window.location.href).searchParams.get('countryCode')
    const countryCode = isStaging && urlCountryCode
      ? urlCountryCode
      : _get(await getIpInfo(), ['data', 1, 'country'])
    value = _includes(COUNTRIES_COOKIES_ALLOWED, countryCode)
      ? RULE_ALLOW_COOKIES
      : RULE_BANNER_REQUIRED
  } catch (error) {
    value = RULE_BANNER_REQUIRED
    console.error(error)
  }

  setCookie(COOKIES.COOKIE_COUNTRY_RULE, value)
  return value
}

export const getCookieGroups = () => {
  const value = getCookieValue(COOKIES.COOKIE_BANNER_DATA)
  const splitted = _split(value, COOKIE_GROUPS_SEPARATOR)
  return _filter(COOKIE_GROUPS_LIST, (name) => _includes(splitted, name))
}

export const setCookieGroups = (groups) => {
  const filtered = _filter(COOKIE_GROUPS_LIST, (name) => _includes(groups, name))
  const value = _join(filtered, COOKIE_GROUPS_SEPARATOR)
  const opts = { expires: COOKIES_EXPIRES_PERIOD_DAYS }
  setCookie(COOKIES.COOKIE_BANNER_DATA, value, opts)
  setCookie(COOKIES.COOKIE_BANNER_TIMESTAMP, Date.now(), opts)
}

const isUserChoiceRelevant = () => {
  const lastUpdate = Number(getCookieValue(COOKIES.COOKIE_BANNER_TIMESTAMP))
  return lastUpdate && lastUpdate + REFRESH_DATA_PERIOD > Date.now()
}

export const isCookiesBannerRequired = async () => {
  if (isUserChoiceRelevant()) {
    return false
  }
  const rule = await getCookiesCountryRuleByIp()
  return rule === RULE_BANNER_REQUIRED
}

export const canUseAnalyticalCookies = async () => {
  if (isUserChoiceRelevant()) {
    return _includes(getCookieGroups(), COOKIES_GROUP_ANALYTICAL)
  }
  const rule = await getCookiesCountryRuleByIp()
  return rule === RULE_ALLOW_COOKIES
}
