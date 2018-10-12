import types from './constants'

/**
 * Create an action to store API key.
 * @param {string} key
 */
export function setApiKey(key) {
  return {
    type: types.SET_API_KEY,
    payload: key,
  }
}

/**
 * Create an action to store API secret.
 * @param {string} secret
 */
export function setApiSecret(secret) {
  return {
    type: types.SET_API_SECRET,
    payload: secret,
  }
}

/**
 * Create an action to store Auth Token.
 * @param {string} token
 */
export function setAuthToken(token) {
  return {
    type: types.SET_AUTH_TOKEN,
    payload: token,
  }
}

/**
 * Create an action to store default language.
 * @param {string} lang
 */
export function setLang(lang) {
  return {
    type: types.SET_LANG,
    payload: lang,
  }
}

/**
 * Create an action to store default theme.
 * @param {string} theme
 */
export function setTheme(theme) {
  return {
    type: types.SET_THEME,
    payload: theme,
  }
}

/**
 * Create an action to store menu mode.
 * @param {string} mode
 */
export function setMenuMode(mode) {
  return {
    type: types.SET_MENU_MODE,
    payload: mode,
  }
}

/**
 * Create an action to store timezone.
 * @param {string} timezone
 */
export function setTimezone(timezone) {
  return {
    type: types.SET_TIMEZONE,
    payload: timezone,
  }
}

/**
 * Create an action to store date format.
 * @param {string} format date format
 */
export function setDateFormat(format) {
  return {
    type: types.SET_DATE_FORMAT,
    payload: format,
  }
}

export default {
  setApiKey,
  setApiSecret,
  setAuthToken,
  setDateFormat,
  setLang,
  setMenuMode,
  setTheme,
  setTimezone,
}
