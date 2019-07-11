export const getSnapshots = state => state.snapshots

export const getDataReceived = state => getSnapshots(state).dataReceived
export const getPositionsEntries = state => getSnapshots(state).positionsEntries
export const getWalletsEntries = state => getSnapshots(state).walletsEntries
export const getTimestamp = state => getSnapshots(state).timestamp

export default {
  getDataReceived,
  getPositionsEntries,
  getWalletsEntries,
  getTimestamp,
  getSnapshots,
}
