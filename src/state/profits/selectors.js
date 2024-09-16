export const getProfits = state => state.profits

export const getCurrentFetchParams = state => getProfits(state).currentFetchParams
export const getDataReceived = state => getProfits(state).dataReceived
export const getEntries = state => getProfits(state).entries
export const getIsUnrealizedProfitExcluded = state => getProfits(state).isUnrealizedProfitExcluded
export const getIsVsAccountBalanceSelected = state => getProfits(state).isVsAccountBalanceSelected
export const getIsVSPrevDayBalance = state => getProfits(state).isVSPrevDayBalance
export const getPageLoading = state => getProfits(state).pageLoading
export const getReportType = state => getProfits(state).reportType
export const getTimeframe = state => getProfits(state).timeframe
export const getParams = (state) => {
  const {
    timeframe,
    isVSPrevDayBalance,
    isUnrealizedProfitExcluded,
    isVsAccountBalanceSelected,
  } = getProfits(state)
  return {
    timeframe,
    isVSPrevDayBalance,
    isUnrealizedProfitExcluded,
    isVsAccountBalanceSelected,
  }
}

export default {
  getCurrentFetchParams,
  getDataReceived,
  getEntries,
  getIsUnrealizedProfitExcluded,
  getIsVsAccountBalanceSelected,
  getIsVSPrevDayBalance,
  getPageLoading,
  getParams,
  getReportType,
  getTimeframe,
  getProfits,
}
