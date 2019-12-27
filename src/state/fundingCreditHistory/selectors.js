export const getFundingCreditHistory = state => state.fcredit

export const getExistingCoins = state => getFundingCreditHistory(state).existingCoins
export const getTargetSymbols = state => getFundingCreditHistory(state).targetSymbols
export const getDataReceived = state => getFundingCreditHistory(state).dataReceived
export const getEntries = state => getFundingCreditHistory(state).entries
export const getPageLoading = state => getFundingCreditHistory(state).pageLoading

export default {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getFundingCreditHistory,
  getPageLoading,
  getTargetSymbols,
}
