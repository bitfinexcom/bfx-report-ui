export const getLedgers = state => state.ledgers

export const getExistingCoins = state => getLedgers(state).existingCoins
export const getTargetCategory = state => getLedgers(state).targetCategory
export const getTargetSymbols = state => getLedgers(state).targetSymbols
export const getDataReceived = state => getLedgers(state).dataReceived
export const getEntries = state => getLedgers(state).entries
export const getPageLoading = state => getLedgers(state).pageLoading

export default {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getLedgers,
  getPageLoading,
  getTargetCategory,
  getTargetSymbols,
}
