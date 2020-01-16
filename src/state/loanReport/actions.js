import types from './constants'

/**
 * Create an action to fetch Loan Report data.
 */
export function fetchLoanReport() {
  return {
    type: types.FETCH_LOAN_REPORT,
  }
}

/**
 * Create an action to set options for Loan Report data.
 * @param {object} payload object contains options
 */
export function setParams(payload) {
  return {
    type: types.SET_PARAMS,
    payload,
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
 * Create an action to refresh Loan Report.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Loan Report.
 * @param {Object[]} payload data set
 */
export function updateLoanReport(payload) {
  return {
    type: types.UPDATE_LOAN_REPORT,
    payload,
  }
}

/**
 * Create an action to set current symbols.
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

export default {
  fetchFail,
  fetchLoanReport,
  refresh,
  setParams,
  updateLoanReport,
  setTargetSymbols,
  addTargetSymbol,
  removeTargetSymbol,
}
