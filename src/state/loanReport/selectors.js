export const getLoanReport = state => state.loanReport

export const getCurrentFetchParams = state => getLoanReport(state).currentFetchParams
export const getDataReceived = state => getLoanReport(state).dataReceived
export const getEntries = state => getLoanReport(state).entries
export const getTargetPairs = state => getLoanReport(state).targetPairs
export const getPageLoading = state => getLoanReport(state).pageLoading
export const getParams = (state) => {
  const {
    targetPairs,
    start,
    end,
    timeframe,
  } = getLoanReport(state)
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
  getLoanReport,
  getPageLoading,
  getParams,
}
