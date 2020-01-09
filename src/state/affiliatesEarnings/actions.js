import types from './constants'

/**
 * Create an action to fetch Affiliates Earnings data.
 * @param {Object} options
 */
export function fetchAffiliatesEarnings(options = {}) {
  return {
    type: types.FETCH_AFFILIATES_EARNINGS,
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
 * Create an action to refresh Affiliates Earnings.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Affiliates Earnings.
 * @param {Object[]} data data set
 */
export function updateAffiliatesEarnings(data) {
  return {
    type: types.UPDATE_AFFILIATES_EARNINGS,
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
  fetchAffiliatesEarnings,
  refresh,
  removeTargetSymbol,
  setTargetSymbols,
  updateAffiliatesEarnings,
}
