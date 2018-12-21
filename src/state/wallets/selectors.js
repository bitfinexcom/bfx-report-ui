export const getWallets = state => state.wallets

export const getDataReceived = state => getWallets(state).dataReceived
export const getEntries = state => getWallets(state).entries

export default {
  getDataReceived,
  getEntries,
  getWallets,
}
