export const getLedgers = state => state.ledgers

export const getExistingCoins = state => getLedgers(state).existingCoins
export const getTargetSymbol = state => getLedgers(state).targetSymbol
export const getDataReceived = state => getLedgers(state).dataReceived
export const getEntries = state => getLedgers(state).entries
export const getOffset = state => getLedgers(state).offset
export const getPageLoading = state => getLedgers(state).pageLoading
export const getPageOffset = state => getLedgers(state).pageOffset
export const getNextPage = state => getLedgers(state).nextPage

export default {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getLedgers,
  getNextPage,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetSymbol,
}
