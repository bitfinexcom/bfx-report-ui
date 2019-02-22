export const getFPayment = state => state.fpayment

export const getExistingCoins = state => getFPayment(state).existingCoins
export const getTargetSymbols = state => getFPayment(state).targetSymbols
export const getDataReceived = state => getFPayment(state).dataReceived
export const getEntries = state => getFPayment(state).entries
export const getOffset = state => getFPayment(state).offset
export const getPageLoading = state => getFPayment(state).pageLoading
export const getPageOffset = state => getFPayment(state).pageOffset
export const getNextPage = state => getFPayment(state).nextPage

export default {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getFPayment,
  getNextPage,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetSymbols,
}
