export const getWinLoss = state => state.winLoss

export const getCurrentFetchParams = state => getWinLoss(state).currentFetchParams
export const getDataReceived = state => getWinLoss(state).dataReceived
export const getEntries = state => getWinLoss(state).entries
export const getIsUnrealizedProfitExcluded = state => getWinLoss(state).isUnrealizedProfitExcluded
export const getIsVsAccountBalanceSelected = state => getWinLoss(state).isVsAccountBalanceSelected
export const getPageLoading = state => getWinLoss(state).pageLoading
export const getTimeframe = state => getWinLoss(state).timeframe
export const getParams = (state) => {
  const {
    timeframe,
    isVSPrevDayBalance,
    isUnrealizedProfitExcluded,
    isVsAccountBalanceSelected,
  } = getWinLoss(state)
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
  getPageLoading,
  getParams,
  getTimeframe,
  getWinLoss,
}
