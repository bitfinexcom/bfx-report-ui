export const getSnapshots = state => state.snapshots

export const getDataReceived = state => getSnapshots(state).dataReceived
export const getPositionsEntries = state => getSnapshots(state).positionsEntries
export const getPositionsTickersEntries = state => getSnapshots(state).positionsTickersEntries
export const getWalletsTickersEntries = state => getSnapshots(state).walletsTickersEntries
export const getWalletsEntries = state => getSnapshots(state).walletsEntries
export const getTimestamp = state => getSnapshots(state).timestamp

export default {
  getDataReceived,
  getPositionsEntries,
  getPositionsTickersEntries,
  getWalletsTickersEntries,
  getWalletsEntries,
  getTimestamp,
  getSnapshots,
}
