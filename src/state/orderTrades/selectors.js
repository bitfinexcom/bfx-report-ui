export const getOrderTrades = state => state.orderTrades

export const getDataReceived = state => getOrderTrades(state).dataReceived
export const getEntries = state => getOrderTrades(state).entries
export const getParams = (state) => {
  const { targetPair, id } = getOrderTrades(state)
  return { targetPair, id }
}
export const getPageLoading = state => getOrderTrades(state).pageLoading
export const getTargetPair = state => getOrderTrades(state).targetPair

export default {
  getDataReceived,
  getEntries,
  getOrderTrades,
  getPageLoading,
  getParams,
  getTargetPair,
}
