export const getWeightedAverages = state => state.weightedAverages

export const getDataReceived = state => getWeightedAverages(state)?.dataReceived
export const getEntries = state => getWeightedAverages(state)?.entries
export const getExistingPairs = state => getWeightedAverages(state)?.existingPairs
export const getPageLoading = state => getWeightedAverages(state)?.pageLoading
export const getTargetPair = state => getWeightedAverages(state)?.targetPair
export const getNextPage = state => getWeightedAverages(state)?.nextPage ?? false

export default {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getNextPage,
  getPageLoading,
  getWeightedAverages,
  getTargetPair,
}
