export const getFeesReport = state => state.feesReport

export const getCurrentFetchParams = state => getFeesReport(state).currentFetchParams
export const getDataReceived = state => getFeesReport(state).dataReceived
export const getEntries = state => getFeesReport(state).entries
export const getPageLoading = state => getFeesReport(state).pageLoading
export const getReportType = state => getFeesReport(state).reportType
export const getIsTradingFees = state => getFeesReport(state).isTradingFees
export const getIsFundingFees = state => getFeesReport(state).isFundingFees
export const getTargetSymbols = state => getFeesReport(state).targetSymbols
export const getParams = (state) => {
  const {
    timeframe,
    targetSymbols,
    isTradingFees,
    isFundingFees,
  } = getFeesReport(state)
  return {
    timeframe,
    targetSymbols,
    isTradingFees,
    isFundingFees,
  }
}

export default {
  getCurrentFetchParams,
  getDataReceived,
  getEntries,
  getFeesReport,
  getIsTradingFees,
  getIsFundingFees,
  getPageLoading,
  getParams,
  getReportType,
  getTargetSymbols,
}
