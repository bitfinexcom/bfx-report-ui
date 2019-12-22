export const getTradedVolume = state => state.tradedVolume

export const getCurrentFetchParams = state => getTradedVolume(state).currentFetchParams
export const getDataReceived = state => getTradedVolume(state).dataReceived
export const getEntries = state => getTradedVolume(state).entries
export const getTargetPairs = state => getTradedVolume(state).targetPairs
export const getPageLoading = state => getTradedVolume(state).pageLoading
export const getParams = (state) => {
  const {
    targetPairs,
    start,
    end,
    timeframe,
  } = getTradedVolume(state)
  return {
    targetPairs,
    start,
    end,
    timeframe,
  }
}

export default {
  getCurrentFetchParams,
  getDataReceived,
  getEntries,
  getPageLoading,
  getParams,
  getTradedVolume,
}
