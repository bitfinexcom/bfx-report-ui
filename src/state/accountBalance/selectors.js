export const getBalance = state => state.balance

export const getDataReceived = state => getBalance(state).dataReceived
export const getEntries = state => getBalance(state).entries
export const getPageLoading = state => getBalance(state).pageLoading
export const getParams = (state) => {
  const {
    start,
    end,
    timeframe,
  } = getBalance(state)
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
  getBalance,
}
