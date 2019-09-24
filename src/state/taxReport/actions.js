import types from './constants'

/**
 * Create an action to fetch Tax Report data.
 * @param {object} payload object contains options
 */
export function fetchTaxReport(payload) {
  return {
    type: types.FETCH_TAX_REPORT,
    payload,
  }
}

/**
 * Create an action to set options for Tax Report data.
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
 * Create an action to refresh Tax Report.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Tax Report.
 * @param {Object[]} payload data set
 */
export function updateTaxReport(payload) {
  return {
    type: types.UPDATE_TAX_REPORT,
    payload,
  }
}

export default {
  fetchFail,
  fetchTaxReport,
  refresh,
  setParams,
  updateTaxReport,
}
