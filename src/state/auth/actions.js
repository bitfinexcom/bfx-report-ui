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

export default {
  checkAuth,
  showAuth,
}
