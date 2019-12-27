export const getTickers = state => state.tickers

export const getDataReceived = state => getTickers(state).dataReceived
export const getEntries = state => getTickers(state).entries
export const getExistingPairs = state => getTickers(state).existingPairs
export const getPageLoading = state => getTickers(state).pageLoading
export const getTargetPairs = state => getTickers(state).targetPairs

export default {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getTickers,
  getPageLoading,
  getTargetPairs,
}
