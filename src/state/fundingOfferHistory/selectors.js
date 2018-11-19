export const getFundingOfferHistory = state => state.foffer

export const getExistingCoins = state => getFundingOfferHistory(state).existingCoins
export const getTargetSymbol = state => getFundingOfferHistory(state).targetSymbol
export const getDataReceived = state => getFundingOfferHistory(state).dataReceived
export const getEntries = state => getFundingOfferHistory(state).entries
export const getOffset = state => getFundingOfferHistory(state).offset
export const getPageLoading = state => getFundingOfferHistory(state).pageLoading
export const getPageOffset = state => getFundingOfferHistory(state).pageOffset
export const getNextPage = state => getFundingOfferHistory(state).nextPage

export default {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getFundingOfferHistory,
  getNextPage,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetSymbol,
}
