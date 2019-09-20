export const getSnapshots = state => state.snapshots

export const getDataReceived = state => getSnapshots(state).dataReceived
export const getPositionsTotalPl = state => getSnapshots(state).positionsTotalPlUsd
export const getPositionsEntries = state => getSnapshots(state).positionsEntries
export const getPositionsTickersEntries = state => getSnapshots(state).positionsTickersEntries
export const getWalletsTotalBalance = state => getSnapshots(state).walletsTotalBalanceUsd
export const getWalletsTickersEntries = state => getSnapshots(state).walletsTickersEntries
export const getWalletsEntries = state => getSnapshots(state).walletsEntries
export const getTimestamp = state => getSnapshots(state).timestamp

export default {
  getDataReceived,
  getPositionsTotalPl,
  getPositionsEntries,
  getPositionsTickersEntries,
  getWalletsTotalBalance,
  getWalletsTickersEntries,
  getWalletsEntries,
  getTimestamp,
  getSnapshots,
}
