export const getTrades = state => state.trades

export const getDataReceived = state => getTrades(state).dataReceived
export const getEntries = state => getTrades(state).entries
export const getExistingPairs = state => getTrades(state).existingPairs
export const getOffset = state => getTrades(state).offset
export const getPageLoading = state => getTrades(state).pageLoading
export const getPageOffset = state => getTrades(state).pageOffset
export const getTargetPairs = state => getTrades(state).targetPairs
export const getNextPage = state => getTrades(state).nextPage

export default {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getNextPage,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetPairs,
  getTrades,
}
