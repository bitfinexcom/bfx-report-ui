export const getPublicTrades = state => state.publicTrades

export const getDataReceived = state => getPublicTrades(state).dataReceived
export const getEntries = state => getPublicTrades(state).entries
export const getExistingPairs = state => getPublicTrades(state).existingPairs
export const getOffset = state => getPublicTrades(state).offset
export const getPageLoading = state => getPublicTrades(state).pageLoading
export const getPageOffset = state => getPublicTrades(state).pageOffset
export const getTargetPair = state => getPublicTrades(state).targetPair

export default {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetPair,
  getPublicTrades,
}
