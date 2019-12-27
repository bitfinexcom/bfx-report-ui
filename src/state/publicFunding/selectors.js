export const getPublicFunding = state => state.publicFunding

export const getDataReceived = state => getPublicFunding(state).dataReceived
export const getEntries = state => getPublicFunding(state).entries
export const getPageLoading = state => getPublicFunding(state).pageLoading
export const getTargetSymbol = state => getPublicFunding(state).targetSymbol

export default {
  getDataReceived,
  getEntries,
  getPageLoading,
  getTargetSymbol,
  getPublicFunding,
}
