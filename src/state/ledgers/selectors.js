export const getLedgers = state => state.ledgers

export const getExistCoins = state => getLedgers(state).existCoins
export const getTargetSymbol = state => getLedgers(state).targetSymbol
export const getDataReceived = state => getLedgers(state).dataReceived
export const getEntries = state => getLedgers(state).entries
export const getOffset = state => getLedgers(state).offset
export const getPageLoading = state => getLedgers(state).pageLoading
export const getPageOffset = state => getLedgers(state).pageOffset

export default {
  getExistCoins,
  getTargetSymbol,
  getDataReceived,
  getEntries,
  getLedgers,
  getOffset,
  getPageLoading,
  getPageOffset,
}
