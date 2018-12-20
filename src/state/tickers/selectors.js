export const getTickers = state => state.tickers

export const getDataReceived = state => getTickers(state).dataReceived
export const getEntries = state => getTickers(state).entries
export const getExistingPairs = state => getTickers(state).existingPairs
export const getOffset = state => getTickers(state).offset
export const getPageLoading = state => getTickers(state).pageLoading
export const getPageOffset = state => getTickers(state).pageOffset
export const getTargetPairs = state => getTickers(state).targetPairs
export const getNextPage = state => getTickers(state).nextPage

export default {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getNextPage,
  getOffset,
  getTickers,
  getPageLoading,
  getPageOffset,
  getTargetPairs,
}
