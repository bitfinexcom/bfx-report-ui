import types from './constants'

/**
 * Create an action to fetch Ledgers data.
 * @param {Object} options
 */
export function fetchLedgers(options = {}) {
  return {
    type: types.FETCH_LEDGERS,
    payload: options,
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
 * Create an action to refresh ledgers.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Ledgers.
 * @param {Object[]} data data set
 */
export function updateLedgers(data) {
  return {
    type: types.UPDATE_LEDGERS,
    payload: {
      data,
    },
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
  refresh,
  removeTargetSymbol,
  setTargetSymbols,
  updateLedgers,
}
