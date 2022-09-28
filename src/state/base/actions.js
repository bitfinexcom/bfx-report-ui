import types from './constants'

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
 * Create an action to set theme.
 * @param {string} theme
 */
export function setTheme(theme) {
  return {
    type: types.SET_THEME,
    payload: theme,
  }
}

/**
 * Create an action to update theme class in ui.
 */
export function updateTheme() {
  return {
    type: types.UPDATE_THEME,
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
 * Create an action to toggle table scroll setting.
 */
export function toggleTableScroll() {
  return {
    type: types.TOGGLE_TABLE_SCROLL,
  }
}

export default {
  setDateFormat,
  setLang,
  setTheme,
  setTimezone,
  showMilliseconds,
  toggleTableScroll,
  updateTheme,
}
