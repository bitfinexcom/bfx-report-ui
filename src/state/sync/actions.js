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
 * Create an action to edit public trades pair preferences.
 * @param {string[]} pairs pairs
 * @param {numeric} startTime start time in milliseconds
 */
export function editPublicTradesPref(pairs, startTime) {
  return {
    type: types.EDIT_PUBLIC_TRADES_PREF,
    payload: {
      pairs,
      startTime,
    },
  }
}

/**
 * Create an action to edit public trades symbol preferences.
 * @param {string[]} symbols symbols
 * @param {numeric} startTime start time in milliseconds
 */
export function editPublicTradesSymbolPref(symbols, startTime) {
  return {
    type: types.EDIT_PUBLIC_FUNDING_PREF,
    payload: {
      symbols,
      startTime,
    },
  }
}

/**
 * Create an action to edit tickers history pair preferences.
 * @param {string[]} pairs pairs
 * @param {numeric} startTime start time in milliseconds
 */
export function editTickersHistoryPairPref(pairs, startTime) {
  return {
    type: types.EDIT_TICKERS_HISTORY_PREF,
    payload: {
      pairs,
      startTime,
    },
  }
}

export default {
  editPublicTradesPref,
  editPublicTradesSymbolPref,
  editTickersHistoryPairPref,
  forceQueryFromDb,
  setSyncMode,
  setSyncProgress,
  setSyncPref,
  startSyncing,
  stopSyncing,
}
