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
 * Create an action to update theme.
 */
export function updateTheme() {
  return {
    type: types.UPDATE_THEME,
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
 * Create an action to store the input timezone.
 * @param {string} timezone
 */
export function setInputTimezone(timezone) {
  return {
    type: types.SET_DISPLAY_TIMEZONE,
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

/**
 * Create an action to store if need to show milliseconds.
 * @param {boolean} show
 */
export function showMilliseconds(show) {
  return {
    type: types.SHOW_MILLISECONDS,
    payload: show,
  }
}

/**
 * Create an action to store query limit.
 * @param {string} limit query limit
 */
export function setQueryLimit(limit) {
  return {
    type: types.SET_QUERY_LIMIT,
    payload: limit,
  }
}

export default {
  setApiKey,
  setApiSecret,
  setAuthToken,
  setDateFormat,
  setLang,
  setMenuMode,
  setQueryLimit,
  setTheme,
  setTimezone,
  setInputTimezone,
  showMilliseconds,
  updateTheme,
}
