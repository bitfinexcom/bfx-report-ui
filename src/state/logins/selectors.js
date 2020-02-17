export const getLogins = state => state.logins

export const getCurrentFetchParams = state => getLogins(state).currentFetchParams
export const getExistingCoins = state => getLogins(state).existingCoins
export const getDataReceived = state => getLogins(state).dataReceived
export const getEntries = state => getLogins(state).entries
export const getPageLoading = state => getLogins(state).pageLoading
export const getParams = (state) => {
  const { start, end } = getLogins(state)
  return {
    start,
    end,
  }
}

export default {
  getCurrentFetchParams,
  getDataReceived,
  getEntries,
  getExistingCoins,
  getLogins,
  getPageLoading,
  getParams,
}
