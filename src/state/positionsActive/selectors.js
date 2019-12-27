export const getActivePositions = state => state.apositions

export const getDataReceived = state => getActivePositions(state).dataReceived
export const getEntries = state => getActivePositions(state).entries
export const getExistingPairs = state => getActivePositions(state).existingPairs
export const getPageLoading = state => getActivePositions(state).pageLoading

export default {
  getActivePositions,
  getDataReceived,
  getEntries,
  getExistingPairs,
  getPageLoading,
}
