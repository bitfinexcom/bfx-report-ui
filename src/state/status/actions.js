import types from './constants'

/**
 * Create an action to clear status.
 * @param {boolean} payload
 */
export function clearStatus() {
  return {
    type: types.CLEAR_STATUS,
  }
}

/**
 * Create an action to update primary status.
 * @param {string} payload
 */
export function updateStatus(payload) {
  return {
    type: types.UPDATE_STATUS,
    payload,
  }
}

/**
 * Create an action to update success status.
 * @param {string} payload
 */
export function updateSuccessStatus(payload) {
  return {
    type: types.UPDATE_SUCCESS_STATUS,
    payload,
  }
}

/**
 * Create an action to update error status.
 * @param {string} payload
 */
export function updateErrorStatus(payload) {
  return {
    type: types.UPDATE_ERROR_STATUS,
    payload,
  }
}
