const getSync = state => state.sync

export const getSyncMode = state => getSync(state) && getSync(state).syncMode

export const getSyncPairs = (state) => {
  const pairs = getSync(state) && getSync(state).syncPairs
  return pairs || []
}

export const getSyncSymbols = (state) => {
  const symbols = getSync(state) && getSync(state).syncSymbols
  return symbols || []
}

export const getStartTime = state => getSync(state) && getSync(state).startTime

export const hasSyncPref = (state) => {
  const res = getSyncPairs(state)
    && getSyncPairs(state).length !== 0
    && getStartTime(state) !== undefined
  return res
}

export const hasSyncSymbolsPref = (state) => {
  const res = getSyncSymbols(state)
    && getSyncSymbols(state).length !== 0
    && getStartTime(state) !== undefined
  return res
}

export default {
  hasSyncPref,
  hasSyncSymbolsPref,
  getStartTime,
  getSyncMode,
  getSyncPairs,
}
