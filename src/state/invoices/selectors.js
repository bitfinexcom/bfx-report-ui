export const getInvoices = state => state.invoices

export const getExistingCoins = state => getInvoices(state).existingCoins
export const getTargetCategory = state => getInvoices(state).targetCategory
export const getTargetSymbols = state => getInvoices(state).targetSymbols
export const getDataReceived = state => getInvoices(state).dataReceived
export const getEntries = state => getInvoices(state).entries
export const getPageLoading = state => getInvoices(state).pageLoading

export default {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getInvoices,
  getPageLoading,
  getTargetCategory,
  getTargetSymbols,
}
