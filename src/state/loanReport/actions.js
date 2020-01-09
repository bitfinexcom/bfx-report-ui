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
 * Create an action to set current pair.
 * @param {string[]} pairs pairs
 */
export function setTargetPairs(pairs) {
  return {
    type: types.SET_PAIRS,
    payload: pairs,
  }
}

/**
 * Create an action to add target pair.
 * @param {string} pair pair
 */
export function addTargetPair(pair) {
  return {
    type: types.ADD_PAIR,
    payload: pair,
  }
}

/**
 * Create an action to remove target pair.
 * @param {string} pair pair
 */
export function removeTargetPair(pair) {
  return {
    type: types.REMOVE_PAIR,
    payload: pair,
  }
}

export default {
  fetchFail,
  fetchLoanReport,
  refresh,
  setParams,
  updateLoanReport,
  setTargetPairs,
  addTargetPair,
  removeTargetPair,
}
