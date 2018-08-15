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

<<<<<<< dc357a5bd6b6353b08bdf7ed01df3b061c5d5f72

/**
 * Create an action to store menu mode.
 * @param {string} mode
 */
export function setMenuMode(mode) {
  return {
    type: types.SET_MENU_MODE,
    payload: mode,
=======
/**
 * Create an action to store timezone.
 * @param {string} timezone
 */
export function setTimezone(timezone) {
  return {
    type: types.SET_TIMEZONE,
    payload: timezone,
>>>>>>> add timezone setting to pref dialog
  }
}

export default {
  setApiKey,
  setApiSecret,
  setLang,
  setMenuMode,
  setTheme,
  setTimezone,
}
