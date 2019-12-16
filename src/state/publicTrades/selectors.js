export const getPublicTrades = state => state.publicTrades

export const getDataReceived = state => getPublicTrades(state).dataReceived
export const getEntries = state => getPublicTrades(state).entries
export const getPageLoading = state => getPublicTrades(state).pageLoading
export const getTargetPair = state => getPublicTrades(state).targetPair

export default {
  getDataReceived,
  getEntries,
  getPageLoading,
  getTargetPair,
  getPublicTrades,
}
