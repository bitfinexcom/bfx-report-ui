export const getLoanReport = state => state.loanReport

export const getCurrentFetchParams = state => getLoanReport(state).currentFetchParams
export const getDataReceived = state => getLoanReport(state).dataReceived
export const getEntries = state => getLoanReport(state).entries
export const getTargetSymbols = state => getLoanReport(state).targetSymbols
export const getPageLoading = state => getLoanReport(state).pageLoading
export const getParams = (state) => {
  const {
    targetSymbols,
    timeframe,
  } = getLoanReport(state)
  return {
    targetSymbols,
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
