export const getChangeLogs = state => state.changeLogs

export const getDataReceived = state => getChangeLogs(state).dataReceived
export const getEntries = state => getChangeLogs(state).entries
export const getPageLoading = state => getChangeLogs(state).pageLoading

export default {
  getChangeLogs,
  getDataReceived,
  getEntries,
  getPageLoading,
}
