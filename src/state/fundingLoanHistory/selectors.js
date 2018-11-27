export const getFundingLoanHistory = state => state.floan

export const getExistingCoins = state => getFundingLoanHistory(state).existingCoins
export const getTargetSymbols = state => getFundingLoanHistory(state).targetSymbols
export const getDataReceived = state => getFundingLoanHistory(state).dataReceived
export const getEntries = state => getFundingLoanHistory(state).entries
export const getOffset = state => getFundingLoanHistory(state).offset
export const getPageLoading = state => getFundingLoanHistory(state).pageLoading
export const getPageOffset = state => getFundingLoanHistory(state).pageOffset
export const getNextPage = state => getFundingLoanHistory(state).nextPage

export default {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getFundingLoanHistory,
  getNextPage,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetSymbols,
}
