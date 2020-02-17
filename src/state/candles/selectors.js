export const getCandlesData = state => state.candles

export const getCandles = state => getCandlesData(state).candles || {}
export const getCurrentFetchParams = state => getCandlesData(state).currentFetchParams
export const getDataReceived = state => getCandlesData(state).dataReceived
export const getPageLoading = state => getCandlesData(state).pageLoading
export const getParams = (state) => {
  const {
    start,
    end,
    timeframe,
    pair,
  } = getCandlesData(state)
  return {
    start,
    end,
    timeframe,
    pair,
  }
}
export const getTrades = state => getCandlesData(state).trades || {}

export default {
  getCandles,
  getCurrentFetchParams,
  getDataReceived,
  getPageLoading,
  getParams,
  getTrades,
}
