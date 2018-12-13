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
 */
export function setSyncPref(pairs, startTime) {
  return {
    type: types.SET_PREF,
    payload: {
      pairs,
      startTime,
    },
  }
}

export default {
  forceQueryFromDb,
  setSyncPref,
  setSyncMode,
  startSyncing,
  stopSyncing,
}
