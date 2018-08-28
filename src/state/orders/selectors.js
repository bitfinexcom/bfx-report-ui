export const getOrders = state => state.orders

export const getDataReceived = state => getOrders(state).dataReceived
export const getEntries = state => getOrders(state).entries
export const getExistPairs = state => getOrders(state).existPairs
export const getOffset = state => getOrders(state).offset
export const getPageLoading = state => getOrders(state).pageLoading
export const getPageOffset = state => getOrders(state).pageOffset
export const getTargetPair = state => getOrders(state).targetPair

export default {
  getDataReceived,
  getEntries,
  getExistPairs,
  getOffset,
  getOrders,
  getPageLoading,
  getPageOffset,
  getTargetPair,
}
