export const getPositions = state => state.positions

export const getDataReceived = state => getPositions(state).dataReceived
export const getEntries = state => getPositions(state).entries
export const getExistingPairs = state => getPositions(state).existingPairs
export const getOffset = state => getPositions(state).offset
export const getPageLoading = state => getPositions(state).pageLoading
export const getPageOffset = state => getPositions(state).pageOffset
export const getTargetPairs = state => getPositions(state).targetPairs
export const getNextPage = state => getPositions(state).nextPage

export default {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getNextPage,
  getOffset,
  getPageLoading,
  getPageOffset,
  getPositions,
  getTargetPairs,
}
