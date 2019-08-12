import types from './constants'

/**
 * Create an action to check Auth state.
 */
export function checkAuth() {
  return {
    type: types.CHECK_AUTH,
  }
}

/**
 * Create an action to show auth dialog.
 */
export function showAuth() {
  return {
    type: types.SHOW_AUTH,
  }
}

/**
 * Create an action to hide auth dialog.
 */
export function hideAuth() {
  return {
    type: types.HIDE_AUTH,
  }
}

/**
 * Create an action to logout.
 */
export function logout() {
  return {
    type: types.LOGOUT,
  }
}

/**
 * Create an action to update successful auth status.
 * @param {boolean} result auth status
 */
export function authSuccess(result) {
  return {
    type: types.AUTH_SUCCESS,
    payload: result,
  }
}

/**
 * Create an action to update auth status.
 * @param {boolean} result auth status
 */
export function updateAuthStatus(result) {
  return {
    type: types.UPDATE_AUTH_STATUS,
    payload: result,
  }
}

export default {
  checkAuth,
  logout,
  showAuth,
  hideAuth,
  authSuccess,
  updateAuthStatus,
}
