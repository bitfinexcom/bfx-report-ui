import config from 'config'

const getAuth = state => state.auth

export const getAuthStatus = state => getAuth(state).authStatus
export const getIsSubAccount = state => getAuth(state).isSubAccount
export const getIsShown = state => getAuth(state).isShown
export const getIsLoading = state => getAuth(state).loading
export const getEmail = state => getAuth(state).email
export const getUsers = state => getAuth(state).users
export const getUsersLoaded = state => getAuth(state).usersLoaded
export const getUsersLoading = state => getAuth(state).usersLoading
export const getSubAccountsLoading = state => getAuth(state)?.subAccountsLoading ?? false
export const getRemoveUserAuth = state => {
  const {
    email, password, isSubAccount, token,
  } = getAuth(state)

  return {
    email,
    password,
    isSubAccount,
    token,
  }
}

export const getAuthData = state => {
  const {
    apiKey,
    apiSecret,
    authToken,
    email,
    password,
    token,
    hasAuthData,
    isNotProtected,
    isPersisted,
    isSubAccount,
  } = getAuth(state)

  return {
    apiKey,
    apiSecret,
    authToken,
    email,
    password,
    token,
    hasAuthData,
    isNotProtected,
    isPersisted,
    isSubAccount,
  }
}

// auth is done either with authToken, apiKey + apiSecret for web or email + password for framework
export function selectAuth(state) {
  const {
    apiKey,
    apiSecret,
    authToken,
    email,
    password,
    token,
    isNotProtected,
    isSubAccount,
  } = getAuthData(state)

  if (!config.showFrameworkMode) {
    if (authToken) {
      return { authToken }
    }
    if (apiKey && apiSecret) {
      return { apiKey, apiSecret }
    }
    return {}
  }

  if (token) {
    return {
      token,
      isSubAccount: isSubAccount || undefined,
    }
  }

  if (email && (isNotProtected || password)) {
    return {
      email,
      password,
      isSubAccount: isSubAccount || undefined,
    }
  }
  return {}
}

export default {
  getAuthData,
  getAuthStatus,
  getRemoveUserAuth,
  getIsSubAccount,
  getIsLoading,
  getIsShown,
  getUsers,
  getUsersLoaded,
  getUsersLoading,
  getSubAccountsLoading,
  selectAuth,
}
