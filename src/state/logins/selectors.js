export const getLogins = state => state.logins

export const getDataReceived = state => getLogins(state).dataReceived
export const getEntries = state => getLogins(state).entries
export const getPageLoading = state => getLogins(state).pageLoading

export default {
  getDataReceived,
  getEntries,
  getLogins,
  getPageLoading,
}
