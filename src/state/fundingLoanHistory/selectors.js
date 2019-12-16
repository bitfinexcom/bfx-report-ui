export const getFundingLoanHistory = state => state.floan

export const getExistingCoins = state => getFundingLoanHistory(state).existingCoins
export const getTargetSymbols = state => getFundingLoanHistory(state).targetSymbols
export const getDataReceived = state => getFundingLoanHistory(state).dataReceived
export const getEntries = state => getFundingLoanHistory(state).entries
export const getPageLoading = state => getFundingLoanHistory(state).pageLoading

export default {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getFundingLoanHistory,
  getPageLoading,
  getTargetSymbols,
}
