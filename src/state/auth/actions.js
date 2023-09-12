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
 * Create an action to add new user data.
 * @param {Object} payload user data
 */
export function addUser(payload) {
  return {
    type: types.ADD_USER,
    payload,
  }
}

export function removeUser() {
  return {
    type: types.REMOVE_USER,
  }
}

/**
 * Create an action to fetch users.
 */
export function fetchUsers() {
  return {
    type: types.FETCH_USERS,
  }
}

/**
 * Create an action to recover password.
 * @param {array} payload new auth data
 */
export function recoverPassword(payload) {
  return {
    type: types.RECOVER_PASSWORD,
    payload,
  }
}

export function recoverPasswordOtp(payload) {
  return {
    type: types.RECOVER_PASSWORD_OTP,
    payload,
  }
}

/**
 * Create an action to set users data.
 * @param {array} payload users data
 */
export function setUsers(payload) {
  return {
    type: types.SET_USERS,
    payload,
  }
}

export function setLoginToken(payload) {
  return {
    type: types.SET_LOGIN_TOKEN,
    payload,
  }
}

export function setUserShouldReLogin(payload) {
  return {
    type: types.SET_USER_SHOULD_RE_LOGIN,
    payload,
  }
}

/**
 * Create an action to sign in.
 * @param {Object} payload auth data
 */
export function signIn(payload) {
  return {
    type: types.SIGN_IN,
    payload,
  }
}

export function signInOtp(payload) {
  return {
    type: types.SIGN_IN_OTP,
    payload,
  }
}

/**
 * Create an action to sign up.
 * @param {Object} payload auth data
 */
export function signUp(payload) {
  return {
    type: types.SIGN_UP,
    payload,
  }
}

export function signUpEmail(payload) {
  return {
    type: types.SIGN_UP_EMAIL,
    payload,
  }
}

export function signUpOtp(payload) {
  return {
    type: types.SIGN_UP_OTP,
    payload,
  }
}

export function showOtpLogin(payload) {
  return {
    type: types.SHOW_OTP_LOGIN,
    payload,
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
 * @param {Object} payload auth data
 */
export function authSuccess(payload) {
  return {
    type: types.AUTH_SUCCESS,
    payload,
  }
}

/**
 * Create an action to update auth data.
 * @param {Object} payload auth status
 */
export function updateAuth(payload) {
  return {
    type: types.UPDATE_AUTH,
    payload,
  }
}

/**
 * Create an action to clear auth data.
 */
export function clearAuth() {
  return {
    type: types.CLEAR_AUTH,
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

export function authExpired() {
  return {
    type: types.AUTH_EXPIRED,
  }
}

export function deleteAccount(payload) {
  return {
    type: types.DELETE_ACCOUNT,
    payload,
  }
}

export function syncAfterUpdate(payload) {
  return {
    type: types.SET_SYNC_AFTER_UPDATE,
    payload,
  }
}

export default {
  checkAuth,
  addUser,
  removeUser,
  fetchUsers,
  logout,
  recoverPassword,
  recoverPasswordOtp,
  setUsers,
  signIn,
  signUp,
  showAuth,
  hideAuth,
  authSuccess,
  updateAuth,
  clearAuth,
  updateAuthStatus,
  signUpEmail,
  signUpOtp,
  showOtpLogin,
  setLoginToken,
  authExpired,
  setUserShouldReLogin,
  signInOtp,
  deleteAccount,
  syncAfterUpdate,
}
