export const getWinLoss = state => state.winLoss

export const getDataReceived = state => getWinLoss(state).dataReceived
export const getEntries = state => getWinLoss(state).entries
export const getPageLoading = state => getWinLoss(state).pageLoading
export const getTimeframe = state => getWinLoss(state).timeframe
export const getParams = (state) => {
  const {
    timeframe,
  } = getWinLoss(state)
  return {
    timeframe,
  }
}

export default {
  getDataReceived,
  getEntries,
  getPageLoading,
  getParams,
  getTimeframe,
  getWinLoss,
}
