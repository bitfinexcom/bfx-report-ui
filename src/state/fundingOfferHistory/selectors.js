export const getFundingOfferHistory = state => state.foffer

export const getExistingCoins = state => getFundingOfferHistory(state).existingCoins
export const getTargetSymbols = state => getFundingOfferHistory(state).targetSymbols
export const getDataReceived = state => getFundingOfferHistory(state).dataReceived
export const getEntries = state => getFundingOfferHistory(state).entries
export const getPageLoading = state => getFundingOfferHistory(state).pageLoading

export default {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getFundingOfferHistory,
  getPageLoading,
  getTargetSymbols,
}
