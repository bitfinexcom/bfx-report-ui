export const getAffiliatesEarnings = state => state.affiliatesEarnings

export const getExistingCoins = state => getAffiliatesEarnings(state).existingCoins
export const getTargetSymbols = state => getAffiliatesEarnings(state).targetSymbols
export const getDataReceived = state => getAffiliatesEarnings(state).dataReceived
export const getEntries = state => getAffiliatesEarnings(state).entries
export const getPageLoading = state => getAffiliatesEarnings(state).pageLoading

export default {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getAffiliatesEarnings,
  getPageLoading,
  getTargetSymbols,
}
