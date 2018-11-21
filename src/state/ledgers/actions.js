import types from './constants'

/**
 * Create an action to fetch Ledgers data.
 * @param {string} symbol symbol param from url
 */
export function fetchLedgers(symbol) {
  return {
    type: types.FETCH_LEDGERS,
    payload: symbol,
  }
}

/**
 * Create an action to note fetch fail.
 * @param {number} payload fail message
 */
export function fetchFail(payload) {
  return {
    type: types.FETCH_FAIL,
    payload,
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
 * Create an action to jump to a specific Ledgers page.
 * @param {number} payload page number
 */
export function jumpPage(payload) {
  return {
    type: types.JUMP_LEDGERS_PAGE,
    payload,
  }
}

/**
 * Create an action to refresh ledgers.
 */
export function refresh() {
  return {
    type: types.REFRESH,
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

/**
 * Create an action to set target symbol.
 * @param {string} symbol symbol
 */
export function setTargetSymbol(symbol) {
  return {
    type: types.SET_SYMBOL,
    payload: symbol,
  }
}

export default {
  fetchFail,
  fetchLedgers,
  fetchNextLedgers,
  fetchPrevLedgers,
  jumpPage,
  refresh,
  setTargetSymbol,
  updateLedgers,
}
