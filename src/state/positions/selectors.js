export const getPositions = state => state.positions

export const getDataReceived = state => getPositions(state).dataReceived
export const getEntries = state => getPositions(state).entries
export const getExistingPairs = state => getPositions(state).existingPairs
export const getPageLoading = state => getPositions(state).pageLoading
export const getTargetPairs = state => getPositions(state).targetPairs

export default {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getPageLoading,
  getPositions,
  getTargetPairs,
}
