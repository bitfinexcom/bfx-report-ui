import types from './constants'

/**
 * Create an action to fetch Ledgers data.
 */
export function fetchLedgers() {
  return {
    type: types.FETCH_LEDGERS,
  }
}

/**
 * Create an action to fetch next Ledgers data.
 */
export function fetchNextLedgers() {
  return {
    type: types.FETCH_NEXT_LEDGERS,
  }
}

/**
 * Create an action to fetch prev Ledgers data.
 */
export function fetchPrevLedgers() {
  return {
    type: types.FETCH_PREV_LEDGERS,
  }
}

/**
 * Create an action to update Ledgers.
 * @param {Object[]} payload data set
 */
export function updateLedgers(payload) {
  return {
    type: types.UPDATE_LEDGERS,
    payload,
  }
}

export default {
  fetchLedgers,
  fetchNextLedgers,
  fetchPrevLedgers,
  updateLedgers,
}
