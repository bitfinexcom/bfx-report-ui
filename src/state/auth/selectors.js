import { getApiKey, getApiSecret, getAuthToken } from 'state/base/selectors'

const getAuth = state => state.auth

export const getAuthStatus = state => getAuth(state).authStatus
export const getIsShown = state => getAuth(state).isShown

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
  getIsShown,
  selectAuth,
}
