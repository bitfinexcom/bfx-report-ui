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
 * @param {string[]} symbols symbols
 */
export function setTargetSymbols(symbols) {
  return {
    type: types.SET_SYMBOLS,
    payload: symbols,
  }
}

/**
 * Create an action to add target symbol.
 * @param {string} symbol symbol
 */
export function addTargetSymbol(symbol) {
  return {
    type: types.ADD_SYMBOL,
    payload: symbol,
  }
}

/**
 * Create an action to remove target symbol.
 * @param {string} symbol symbol
 */
export function removeTargetSymbol(symbol) {
  return {
    type: types.REMOVE_SYMBOL,
    payload: symbol,
  }
}

export default {
  addTargetSymbol,
  fetchFail,
  fetchLedgers,
  fetchNextLedgers,
  fetchPrevLedgers,
  jumpPage,
  refresh,
  removeTargetSymbol,
  setTargetSymbols,
  updateLedgers,
}
