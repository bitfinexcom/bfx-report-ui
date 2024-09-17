export const getProfits = state => state.profits

export const getEntries = state => getProfits(state)?.entries ?? []
export const getPageLoading = state => getProfits(state)?.pageLoading ?? false
export const getDataReceived = state => getProfits(state)?.dataReceived ?? false

export default {
  getProfits,
  getEntries,
  getPageLoading,
  getDataReceived,
}
