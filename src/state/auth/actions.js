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
 * Create an action to check Auth state with token.
 * @param {string} auth token
 */
export function checkAuthWithToken(token) {
  return {
    type: types.CHECK_AUTH_WITH_TOKEN,
    payload: token,
  }
}

/**
 * Create an action to check Auth state with local stored authToken.
 * @param {string} auth token
 */
export function checkAuthWithLocalToken() {
  return {
     type: types.CHECK_AUTH_WITH_LOCAL_TOKEN
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
 * Create an action to logout.
 */
export function logout() {
  return {
    type: types.LOGOUT,
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
  checkAuthWithToken,
  checkAuthWithLocalToken,
  logout,
  showAuth,
  updateAuthStatus,
}
