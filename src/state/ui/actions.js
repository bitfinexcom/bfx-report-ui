import types from './constants'

/**
 * Create an action to toggle electron backend loaded event.
 */
export function electronBackendLoaded() {
  return {
    type: types.ELECTRON_BACKEND_LOADED,
  }
}

/**
 * Create an action to show/hide export dialog.
 */
export function toggleExportDialog() {
  return {
    type: types.TOGGLE_EXPORT_DIALOG,
  }
}

/**
 * Create an action to show/hide export success dialog.
 */
export function toggleExportSuccessDialog() {
  return {
    type: types.TOGGLE_EXPORT_SUCCESS_DIALOG,
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
 * Create an action to toggle pagination dialog.
 * @param {boolean} isOpen dialog state
 * @param {number} latestPaginationTimestamp timestamp of the last checked entry (nextPage value)
 */
export function togglePaginationDialog(isOpen, latestPaginationTimestamp) {
  return {
    type: types.TOGGLE_PAGINATION_DIALOG,
    payload: {
      isOpen,
      latestPaginationTimestamp,
    },
  }
}

/**
 * Create an action to show/hide preferences dialog.
 */
export function togglePreferencesDialog() {
  return {
    type: types.TOGGLE_PREFERENCES_DIALOG,
  }
}

/**
 * Create an action to show/hide timeframe dialog.
 */
export function toggleTimeFrameDialog() {
  return {
    type: types.TOGGLE_TIMEFRAME_DIALOG,
  }
}

/**
 * Create an action to proceed with pagination request.
 * @param {boolean} payload indicator of whether pagination request should proceed
 */
export function proceedPaginationRequest(payload) {
  return {
    type: types.PROCEED_PAGINATION_REQUEST,
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

/**
 * Create an action to handle document resize event.
 */
export function uiResized() {
  return {
    type: types.UI_RESIZED,
  }
}

export default {
  electronBackendLoaded,
  toggleExportDialog,
  toggleExportSuccessDialog,
  toggleFrameworkDialog,
  proceedFrameworkRequest,
  togglePaginationDialog,
  togglePreferencesDialog,
  toggleTimeFrameDialog,
  proceedPaginationRequest,
}
