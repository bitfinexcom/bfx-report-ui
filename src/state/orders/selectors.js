export const getOrders = state => state.orders

export const getDataReceived = state => getOrders(state).dataReceived
export const getEntries = state => getOrders(state).entries
export const getExistingPairs = state => getOrders(state).existingPairs
export const getOffset = state => getOrders(state).offset
export const getPageLoading = state => getOrders(state).pageLoading
export const getPageOffset = state => getOrders(state).pageOffset
export const getTargetPair = state => getOrders(state).targetPair
export const getNextPage = state => getOrders(state).nextPage

export default {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getNextPage,
  getOffset,
  getOrders,
  getPageLoading,
  getPageOffset,
  getTargetPair,
}
