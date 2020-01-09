export const getWallets = state => state.wallets

export const getDataReceived = state => getWallets(state).dataReceived
export const getEntries = state => getWallets(state).entries
export const getPageLoading = state => getWallets(state).pageLoading
export const getTimestamp = state => getWallets(state).timestamp

export default {
  getDataReceived,
  getEntries,
  getPageLoading,
  getTimestamp,
  getWallets,
}
