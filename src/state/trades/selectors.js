export const getTrades = state => state.trades

export const getDataReceived = state => getTrades(state).dataReceived
export const getEntries = state => getTrades(state).entries
export const getExistingPairs = state => getTrades(state).existingPairs
export const getOffset = state => getTrades(state).offset
export const getPageLoading = state => getTrades(state).pageLoading
export const getPageOffset = state => getTrades(state).pageOffset
export const getTargetPair = state => getTrades(state).targetPair

export default {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetPair,
  getTrades,
}
