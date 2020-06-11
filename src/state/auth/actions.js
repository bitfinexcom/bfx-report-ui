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

/**
 * Create an action to fetch users.
 */
export function fetchUsers() {
  return {
    type: types.FETCH_USERS,
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
  addUser,
  fetchUsers,
  logout,
  setUsers,
  signIn,
  signUp,
  showAuth,
  hideAuth,
  authSuccess,
  updateAuth,
  updateAuthStatus,
}
