const getTrades = state => state.trades

export const getDataReceived = state => getTrades(state).dataReceived
export const getEntries = state => getTrades(state).entries
export const getOffset = state => getTrades(state).offset
export const getPageLoading = state => getTrades(state).pageLoading
export const getPageOffset = state => getTrades(state).pageOffset

export default {
  getDataReceived,
  getEntries,
  getOffset,
  getPageLoading,
  getPageOffset,
}
