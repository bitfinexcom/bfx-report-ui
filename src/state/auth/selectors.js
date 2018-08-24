const getAuth = state => state.auth

export const getAuthStatus = state => getAuth(state).authStatus
export const getIsShown = state => getAuth(state).isShown

export default {
  getAuthStatus,
  getIsShown,
}
