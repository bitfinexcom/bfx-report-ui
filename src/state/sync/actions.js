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

export default {
  setSyncMode,
  startSyncing,
  stopSyncing,
}
