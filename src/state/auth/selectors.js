import { getApiKey, getApiSecret, getAuthToken } from 'state/base/selectors'

const getAuth = state => state.auth

export const getAuthStatus = state => getAuth(state).authStatus
export const getIsShown = state => getAuth(state).isShown
export const getIsLoading = state => getAuth(state).loading

export function selectAuth(state) {
  return getAuthToken(state)
    ? {
      authToken: getAuthToken(state),
    }
    : {
      apiKey: getApiKey(state),
      apiSecret: getApiSecret(state),
    }
}

export default {
  getAuthStatus,
  getIsLoading,
  getIsShown,
  selectAuth,
}
