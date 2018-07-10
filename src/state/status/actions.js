import types from './constants'

/**
 * Create an action to clear status.
 */
export function clearStatus() {
  return {
    type: types.CLEAR_STATUS,
  }
}

/**
 * Create an action to update primary status.
 * @param {string} msg
 */
export function updateStatus(msg) {
  return {
    type: types.UPDATE_STATUS,
    payload: msg,
  }
}

/**
 * Create an action to update success status.
 * @param {string} msg
 */
export function updateSuccessStatus(msg) {
  return {
    type: types.UPDATE_SUCCESS_STATUS,
    payload: msg,
  }
}

/**
 * Create an action to update error status.
 * @param {string} msg
 */
export function updateErrorStatus(msg) {
  return {
    type: types.UPDATE_ERROR_STATUS,
    payload: msg,
  }
}

export default {
  clearStatus,
  updateStatus,
  updateSuccessStatus,
  updateErrorStatus,
}
