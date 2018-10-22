import types from './constants'

/**
 * Create an action to show/hide custom dialog.
 *  @param {boolean} show true to show or false to hide
 */
export function showCustomDialog(show) {
  return {
    type: types.SHOW_CUSTOM_DIALOG,
    payload: show,
  }
}

/**
 * Create an action to handle document loaded event.
 */
export function uiLoaded() {
  return {
    type: types.UI_LOADED,
  }
}

export default {
  showCustomDialog,
}
