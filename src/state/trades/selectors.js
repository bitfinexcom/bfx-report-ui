export const getTrades = state => state.trades

export const getDataReceived = state => getTrades(state).dataReceived
export const getEntries = state => getTrades(state).entries
export const getExistingPairs = state => getTrades(state).existingPairs
export const getPageLoading = state => getTrades(state).pageLoading
export const getTargetPairs = state => getTrades(state).targetPairs

export default {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getPageLoading,
  getTargetPairs,
  getTrades,
}
