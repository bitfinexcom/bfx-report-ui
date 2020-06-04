export const getSPayments = state => state.spayments

export const getExistingCoins = state => getSPayments(state).existingCoins
export const getTargetSymbols = state => getSPayments(state).targetSymbols
export const getDataReceived = state => getSPayments(state).dataReceived
export const getEntries = state => getSPayments(state).entries
export const getPageLoading = state => getSPayments(state).pageLoading

export default {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getSPayments,
  getPageLoading,
  getTargetSymbols,
}
