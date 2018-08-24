const getLedgers = state => state.ledgers

export const getCurencies = state => getLedgers(state).currencies
export const getCurrentSymbol = state => getLedgers(state).currentSymbol
export const getDataReceived = state => getLedgers(state).dataReceived
export const getEntries = state => getLedgers(state).entries
export const getOffset = state => getLedgers(state).offset
export const getPageLoading = state => getLedgers(state).pageLoading
export const getPageOffset = state => getLedgers(state).pageOffset

export default {
  getCurencies,
  getCurrentSymbol,
  getDataReceived,
  getEntries,
  getOffset,
  getPageLoading,
  getPageOffset,
}
