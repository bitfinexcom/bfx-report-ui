export const getOrders = state => state.orders

export const getDataReceived = state => getOrders(state).dataReceived
export const getEntries = state => getOrders(state).entries
export const getExistingPairs = state => getOrders(state).existingPairs
export const getPageLoading = state => getOrders(state).pageLoading
export const getTargetPairs = state => getOrders(state).targetPairs

export default {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getOrders,
  getPageLoading,
  getTargetPairs,
}
