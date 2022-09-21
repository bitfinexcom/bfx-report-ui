import types from './constants'

/**
 * Create an action to fetch Fees Report data.
 */
export function fetchFeesReport() {
  return {
    type: types.FETCH_FEES_REPORT,
  }
}

/**
 * Create an action to set options for Fees Report data.
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
 * Create an action to refresh Fees Report.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Fees Report.
 * @param {Object[]} payload data set
 */
export function updateFeesReport(payload) {
  return {
    type: types.UPDATE_FEES_REPORT,
    payload,
  }
}

/**
 * Create an action to set current pair.
 * @param {string[]} pairs
 */
export function setTargetPairs(pairs) {
  return {
    type: types.SET_PAIRS,
    payload: pairs,
  }
}

/**
 * Create an action to add target pair.
 * @param {string} pair
 */
export function addTargetPair(pair) {
  return {
    type: types.ADD_PAIR,
    payload: pair,
  }
}

/**
 * Create an action to remove target pair.
 * @param {string} pair
 */
export function removeTargetPair(pair) {
  return {
    type: types.REMOVE_PAIR,
    payload: pair,
  }
}

/**
 * Create an action to clear target pairs.
 */
export function clearTargetPairs() {
  return {
    type: types.CLEAR_PAIRS,
  }
}

export function setReportType(payload) {
  return {
    type: types.SET_REPORT_TYPE,
    payload,
  }
}

export default {
  addTargetPair,
  clearTargetPairs,
  fetchFail,
  fetchFeesReport,
  refresh,
  removeTargetPair,
  setParams,
  setReportType,
  setTargetPairs,
  updateFeesReport,
}
