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
 * Create an action to show/hide framework dialog.
 */
export function toggleFrameworkDialog() {
  return {
    type: types.TOGGLE_FRAMEWORK_DIALOG,
  }
}

/**
 * Create an action to proceed with framework request.
 * @param {object} payload object with boolean properties shouldProceed and isFrameworkDialogDisabled
 */
export function proceedFrameworkRequest(payload) {
  return {
    type: types.PROCEED_FRAMEWORK_REQUEST,
    payload,
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
  toggleFrameworkDialog,
}
