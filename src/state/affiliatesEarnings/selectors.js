export const getAffiliatesEarnings = state => state.affiliatesEarnings

export const getExistingCoins = state => getAffiliatesEarnings(state).existingCoins
export const getTargetSymbols = state => getAffiliatesEarnings(state).targetSymbols
export const getDataReceived = state => getAffiliatesEarnings(state).dataReceived
export const getEntries = state => getAffiliatesEarnings(state).entries
export const getOffset = state => getAffiliatesEarnings(state).offset
export const getPageLoading = state => getAffiliatesEarnings(state).pageLoading
export const getPageOffset = state => getAffiliatesEarnings(state).pageOffset
export const getNextPage = state => getAffiliatesEarnings(state).nextPage

export default {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getAffiliatesEarnings,
  getNextPage,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetSymbols,
}
