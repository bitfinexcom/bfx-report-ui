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

export default {
  showCustomDialog,
}
