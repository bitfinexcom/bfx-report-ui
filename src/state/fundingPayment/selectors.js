export const getFPayment = state => state.fpayment

export const getExistingCoins = state => getFPayment(state).existingCoins
export const getTargetSymbols = state => getFPayment(state).targetSymbols
export const getDataReceived = state => getFPayment(state).dataReceived
export const getEntries = state => getFPayment(state).entries
export const getPageLoading = state => getFPayment(state).pageLoading

export default {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getFPayment,
  getPageLoading,
  getTargetSymbols,
}
