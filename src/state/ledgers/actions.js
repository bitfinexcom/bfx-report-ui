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

export default {
  fetchLedgers,
  fetchNextLedgers,
  fetchPrevLedgers,
}
