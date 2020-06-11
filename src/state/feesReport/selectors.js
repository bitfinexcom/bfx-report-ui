export const getFeesReport = state => state.feesReport

export const getCurrentFetchParams = state => getFeesReport(state).currentFetchParams
export const getDataReceived = state => getFeesReport(state).dataReceived
export const getEntries = state => getFeesReport(state).entries
export const getTargetPairs = state => getFeesReport(state).targetPairs
export const getPageLoading = state => getFeesReport(state).pageLoading
export const getParams = (state) => {
  const {
    targetPairs,
    timeframe,
  } = getFeesReport(state)
  return {
    targetPairs,
    timeframe,
  }
}

export default {
  getCurrentFetchParams,
  getDataReceived,
  getEntries,
  getPageLoading,
  getParams,
  getFeesReport,
}
