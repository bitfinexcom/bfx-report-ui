export const getFundingCreditHistory = state => state.fcredit

export const getExistingCoins = state => getFundingCreditHistory(state).existingCoins
export const getTargetSymbol = state => getFundingCreditHistory(state).targetSymbol
export const getDataReceived = state => getFundingCreditHistory(state).dataReceived
export const getEntries = state => getFundingCreditHistory(state).entries
export const getOffset = state => getFundingCreditHistory(state).offset
export const getPageLoading = state => getFundingCreditHistory(state).pageLoading
export const getPageOffset = state => getFundingCreditHistory(state).pageOffset
export const getNextPage = state => getFundingCreditHistory(state).nextPage

export default {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getFundingCreditHistory,
  getNextPage,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetSymbol,
}
