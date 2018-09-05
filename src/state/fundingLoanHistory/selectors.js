export const getFundingLoanHistory = state => state.floan

export const getDataReceived = state => getFundingLoanHistory(state).dataReceived
export const getEntries = state => getFundingLoanHistory(state).entries
export const getOffset = state => getFundingLoanHistory(state).offset
export const getPageLoading = state => getFundingLoanHistory(state).pageLoading
export const getPageOffset = state => getFundingLoanHistory(state).pageOffset

export default {
  getDataReceived,
  getEntries,
  getFundingLoanHistory,
  getOffset,
  getPageLoading,
  getPageOffset,
}
