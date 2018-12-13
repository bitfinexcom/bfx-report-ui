const getSync = state => state.sync

export const getSyncMode = state => getSync(state).syncMode
export const getSyncPairs = state => getSync(state).syncPairs || []
export const getStartTime = state => getSync(state).startTime
export const hasSyncPref = state => getSyncPairs(state).length !== 0 && getStartTime(state) !== undefined

export default {
  hasSyncPref,
  getStartTime,
  getSyncMode,
  getSyncPairs,
}
