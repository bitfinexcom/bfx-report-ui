export const getFundingCreditHistory = state => state.fcredit

export const getDataReceived = state => getFundingCreditHistory(state).dataReceived
export const getEntries = state => getFundingCreditHistory(state).entries
export const getOffset = state => getFundingCreditHistory(state).offset
export const getPageLoading = state => getFundingCreditHistory(state).pageLoading
export const getPageOffset = state => getFundingCreditHistory(state).pageOffset

export default {
  getDataReceived,
  getEntries,
  getFundingCreditHistory,
  getOffset,
  getPageLoading,
  getPageOffset,
}
