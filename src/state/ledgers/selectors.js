export const getLedgers = state => state.ledgers

export const getExistingCoins = state => getLedgers(state).existingCoins
export const getTargetSymbol = state => getLedgers(state).targetSymbol
export const getDataReceived = state => getLedgers(state).dataReceived
export const getEntries = state => getLedgers(state).entries
export const getOffset = state => getLedgers(state).offset
export const getPageLoading = state => getLedgers(state).pageLoading
export const getPageOffset = state => getLedgers(state).pageOffset

export default {
  getExistingCoins,
  getTargetSymbol,
  getDataReceived,
  getEntries,
  getLedgers,
  getOffset,
  getPageLoading,
  getPageOffset,
}
