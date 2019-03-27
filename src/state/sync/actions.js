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
 * Create an action to set preferences.
 * @param {string[]} pairs pairs
 * @param {numeric} startTime start time in milliseconds
 * @param {boolean} logout logout after set pref
 */
export function setSyncPref(pairs, startTime, logout) {
  return {
    type: types.SET_PREF,
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
 * @param {boolean} logout logout after set pref
 */
export function setSyncSymbolPref(symbols, startTime, logout) {
  return {
    type: types.SET_SYMBOL_PREF,
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
  setSyncPref,
  setSyncSymbolPref,
  startSyncing,
  stopSyncing,
}
