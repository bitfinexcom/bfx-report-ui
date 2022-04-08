import types from './constants'

/**
 * Create an action to fetch Staking Payments data.
 * @param {Object} options
 */
export function fetchData(options = {}) {
  return {
    type: types.FETCH_DATA,
    payload: options,
  }
}

/**
 * Create an action to note fetch fail.
 * @param {Object} payload fail message
 */
export function fetchFail(payload) {
  return {
    type: types.FETCH_FAIL,
    payload,
  }
}

/**
 * Create an action to refresh Staking Payments.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Staking Payments.
 * @param {Object[]} data
 */
export function updateData(data) {
  return {
    type: types.UPDATE_DATA,
    payload: {
      data,
    },
  }
}

/**
 * Create an action to set target symbol.
 * @param {string[]} symbols
 */
export function setTargetSymbols(symbols) {
  return {
    type: types.SET_SYMBOLS,
    payload: symbols,
  }
}

/**
 * Create an action to add target symbol.
 * @param {string} symbol
 */
export function addTargetSymbol(symbol) {
  return {
    type: types.ADD_SYMBOL,
    payload: symbol,
  }
}

/**
 * Create an action to remove target symbol.
 * @param {string} symbol
 */
export function removeTargetSymbol(symbol) {
  return {
    type: types.REMOVE_SYMBOL,
    payload: symbol,
  }
}

/**
 * Create an action to clear target symbols.
 */
export function clearTargetSymbols() {
  return {
    type: types.CLEAR_SYMBOLS,
  }
}

export default {
  addTargetSymbol,
  clearTargetSymbols,
  fetchFail,
  fetchData,
  refresh,
  removeTargetSymbol,
  setTargetSymbols,
  updateData,
}
