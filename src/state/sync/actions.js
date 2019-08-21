import types from './constants'

/**
 * Create an action to set sync mode.
 * @param {string} mode sync mode
 */
export function setSyncMode(mode) {
  return {
    type: types.SET_SYNC_MODE,
    payload: mode,
  }
}

/**
 * Create an action to start syncing.
 */
export function startSyncing() {
  return {
    type: types.START_SYNCING,
  }
}

/**
 * Create an action to stop syncing.
 */
export function stopSyncing() {
  return {
    type: types.STOP_SYNCING,
  }
}

/**
 * Create an action to force query from DB.
 */
export function forceQueryFromDb() {
  return {
    type: types.FORCE_OFFLINE,
  }
}

/**
 * Create an action to set sync progress.
 */
export function setSyncProgress(payload) {
  return {
    type: types.SET_PROGRESS,
    payload,
  }
}

/**
 * Create an action to set preferences.
 */
export function setSyncPref(payload) {
  return {
    type: types.SET_PREF,
    payload,
  }
}

/**
 * Create an action to update sync status.
 */
export function updateSyncStatus() {
  return {
    type: types.UPDATE_STATUS,
  }
}

/**
 * Create an action to set pair preferences.
 * @param {string[]} pairs pairs
 * @param {numeric} startTime start time in milliseconds
 */
export function setSyncPairPref(pairs, startTime) {
  return {
    type: types.SET_PAIR_PREF,
    payload: {
      pairs,
      startTime,
    },
  }
}

/**
 * Create an action to edit pair preferences.
 * @param {string[]} pairs pairs
 * @param {numeric} startTime start time in milliseconds
 * @param {boolean} logout logout after set pref
 */
export function editSyncPairPref(pairs, startTime, logout) {
  return {
    type: types.EDIT_PAIR_PREF,
    payload: {
      pairs,
      startTime,
      logout,
    },
  }
}

/**
 * Create an action to set symbol preferences.
 * @param {string[]} symbols symbols
 * @param {numeric} startTime start time in milliseconds
 */
export function setSyncSymbolPref(symbols, startTime) {
  return {
    type: types.SET_SYMBOL_PREF,
    payload: {
      symbols,
      startTime,
    },
  }
}

/**
 * Create an action to edit symbol preferences.
 * @param {string[]} symbols symbols
 * @param {numeric} startTime start time in milliseconds
 * @param {boolean} logout logout after set pref
 */
export function editSyncSymbolPref(symbols, startTime, logout) {
  return {
    type: types.EDIT_SYMBOL_PREF,
    payload: {
      symbols,
      startTime,
      logout,
    },
  }
}

export default {
  forceQueryFromDb,
  setSyncMode,
  setSyncProgress,
  setSyncPref,
  setSyncPairPref,
  editSyncPairPref,
  setSyncSymbolPref,
  editSyncSymbolPref,
  startSyncing,
  stopSyncing,
}
