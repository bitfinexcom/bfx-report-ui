import { getApiKey, getApiSecret, getAuthToken } from 'state/base/selectors'

const getAuth = state => state.auth

export const getAuthStatus = state => getAuth(state).authStatus
export const getIsShown = state => getAuth(state).isShown
export const getIsLoading = state => getAuth(state).loading

// auth is done either with authToken or apiKey + apiSecret
export function selectAuth(state) {
  const authToken = getAuthToken(state)

  if (authToken) {
    return { authToken }
  }

  const apiKey = getApiKey(state)
  const apiSecret = getApiSecret(state)

  if (apiKey && apiSecret) {
    return { apiKey, apiSecret }
  }

  return null
}

export default {
  getAuthStatus,
  getIsLoading,
  getIsShown,
  selectAuth,
}
