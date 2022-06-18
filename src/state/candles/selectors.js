export const getCandlesData = state => state.candles

export const getCandles = state => getCandlesData(state).candles || {}
export const getCurrentFetchParams = state => getCandlesData(state).currentFetchParams
export const getDataReceived = state => getCandlesData(state).dataReceived
export const getPageLoading = state => getCandlesData(state).pageLoading
export const getChartLoading = state => getCandlesData(state).chartLoading
export const getCandlesNextPage = state => getCandles(state).nextPage

export const getParams = (state) => {
  const {
    timeframe,
    pair,
  } = getCandlesData(state)
  return {
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
  getChartLoading,
  getCandlesNextPage,
  getParams,
  getTrades,
}
