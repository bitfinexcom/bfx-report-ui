export const getWinLoss = state => state.winLoss

export const getDataReceived = state => getWinLoss(state).dataReceived
export const getEntries = state => getWinLoss(state).entries
export const getPageLoading = state => getWinLoss(state).pageLoading
export const getParams = (state) => {
  const {
    start,
    end,
    timeframe,
  } = getWinLoss(state)
  return {
    start,
    end,
    timeframe,
  }
}

export default {
  getDataReceived,
  getEntries,
  getPageLoading,
  getParams,
  getWinLoss,
}
