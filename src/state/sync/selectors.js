const getSync = state => state.sync || {}

export const getSyncMode = state => getSync(state).syncMode || false
export const getSyncPairs = state => getSync(state).syncPairs || []
export const getSyncSymbols = state => getSync(state).syncSymbols || []
export const getStartTime = state => getSync(state).startTime
export const getSyncProgress = state => getSync(state).progress || 0

export const hasSyncPref = state => getSyncPairs(state).length !== 0
  && getStartTime(state) !== undefined
export const hasSyncSymbolsPref = state => getSyncSymbols(state).length !== 0
  && getStartTime(state) !== undefined

export default {
  hasSyncPref,
  hasSyncSymbolsPref,
  getStartTime,
  getSyncMode,
  getSyncPairs,
  getSyncSymbols,
}
