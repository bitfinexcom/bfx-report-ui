const getSync = state => state.sync

export const getSyncMode = state => getSync(state) && getSync(state).syncMode

export const getSyncPairs = (state) => {
  const pairs = getSync(state) && getSync(state).syncPairs
  return pairs || []
}

export const getStartTime = state => getSync(state) && getSync(state).startTime

export const hasSyncPref = (state) => {
  const res = getSyncPairs(state)
    && getSyncPairs(state).length !== 0
    && getStartTime(state) !== undefined
  return res
}

export default {
  hasSyncPref,
  getStartTime,
  getSyncMode,
  getSyncPairs,
}
