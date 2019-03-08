export const getActivePositions = state => state.apositions

export const getDataReceived = state => getActivePositions(state).dataReceived
export const getEntries = state => getActivePositions(state).entries
export const getExistingPairs = state => getActivePositions(state).existingPairs
export const getOffset = state => getActivePositions(state).offset
export const getPageLoading = state => getActivePositions(state).pageLoading
export const getPageOffset = state => getActivePositions(state).pageOffset
export const getTargetPairs = state => getActivePositions(state).targetPairs
export const getNextPage = state => getActivePositions(state).nextPage

export default {
  getActivePositions,
  getDataReceived,
  getEntries,
  getExistingPairs,
  getNextPage,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetPairs,
}
