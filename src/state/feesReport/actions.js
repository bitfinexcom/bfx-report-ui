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

export function setReportType(payload) {
  return {
    type: types.SET_REPORT_TYPE,
    payload,
  }
}

export function setTargetSymbols(symbols) {
  return {
    type: types.SET_SYMBOLS,
    payload: symbols,
  }
}

export function addTargetSymbol(symbol) {
  return {
    type: types.ADD_SYMBOL,
    payload: symbol,
  }
}

export function removeTargetSymbol(symbol) {
  return {
    type: types.REMOVE_SYMBOL,
    payload: symbol,
  }
}

export function clearTargetSymbols() {
  return {
    type: types.CLEAR_SYMBOLS,
  }
}

export default {
  addTargetSymbol,
  clearTargetSymbols,
  fetchFail,
  fetchFeesReport,
  refresh,
  removeTargetSymbol,
  setParams,
  setReportType,
  updateFeesReport,
}
