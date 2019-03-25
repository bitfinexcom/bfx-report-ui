export const getPublicFunding = state => state.publicFunding

export const getDataReceived = state => getPublicFunding(state).dataReceived
export const getEntries = state => getPublicFunding(state).entries
export const getOffset = state => getPublicFunding(state).offset
export const getPageLoading = state => getPublicFunding(state).pageLoading
export const getPageOffset = state => getPublicFunding(state).pageOffset
export const getTargetSymbol = state => getPublicFunding(state).targetSymbol
export const getNextPage = state => getPublicFunding(state).nextPage

export default {
  getDataReceived,
  getEntries,
  getNextPage,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetSymbol,
  getPublicFunding,
}
