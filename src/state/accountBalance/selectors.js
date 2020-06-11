export const getBalance = state => state.balance

export const getCurrentFetchParams = state => getBalance(state).currentFetchParams
export const getDataReceived = state => getBalance(state).dataReceived
export const getEntries = state => getBalance(state).entries
export const getPageLoading = state => getBalance(state).pageLoading
export const getTimeframe = state => getBalance(state).timeframe

export default {
  getBalance,
  getCurrentFetchParams,
  getDataReceived,
  getEntries,
  getPageLoading,
  getTimeframe,
}
