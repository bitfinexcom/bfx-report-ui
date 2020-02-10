export const getCandles = state => state.candles

export const getCandlesEntries = state => getCandles(state).candles || []
export const getCurrentFetchParams = state => getCandles(state).currentFetchParams
export const getDataReceived = state => getCandles(state).dataReceived
export const getPageLoading = state => getCandles(state).pageLoading
export const getParams = (state) => {
  const {
    start,
    end,
    timeFrame,
    pair,
  } = getCandles(state)
  return {
    start,
    end,
    timeFrame,
    pair,
  }
}
export const getTradesEntries = state => getCandles(state).trades || []

export default {
  getCurrentFetchParams,
  getDataReceived,
  getCandlesEntries,
  getPageLoading,
  getParams,
  getTradesEntries,
}
