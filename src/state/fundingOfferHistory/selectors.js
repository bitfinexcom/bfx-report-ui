export const getFundingOfferHistory = state => state.foffer

export const getDataReceived = state => getFundingOfferHistory(state).dataReceived
export const getEntries = state => getFundingOfferHistory(state).entries
export const getOffset = state => getFundingOfferHistory(state).offset
export const getPageLoading = state => getFundingOfferHistory(state).pageLoading
export const getPageOffset = state => getFundingOfferHistory(state).pageOffset

export default {
  getDataReceived,
  getEntries,
  getFundingOfferHistory,
  getOffset,
  getPageLoading,
  getPageOffset,
}
