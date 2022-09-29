import types from './constants'

/**
 * Create an action to fetch WinLoss data.
 * @param {object} payload object contains options for fetching WinLoss
 */
export function fetchWinLoss(payload) {
  return {
    type: types.FETCH_WIN_LOSS,
    payload,
  }
}

/**
 * Create an action to set options for WinLoss data.
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
 * @param {Object} payload fail message
 */
export function fetchFail(payload) {
  return {
    type: types.FETCH_FAIL,
    payload,
  }
}

/**
 * Create an action to refresh WinLoss.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update WinLoss.
 * @param {Object[]} payload data set
 */
export function updateWinLoss(payload) {
  return {
    type: types.UPDATE_WIN_LOSS,
    payload,
  }
}

export function setReportType(payload) {
  return {
    type: types.SET_REPORT_TYPE,
    payload,
  }
}

export default {
  fetchFail,
  fetchWinLoss,
  refresh,
  setParams,
  setReportType,
  updateWinLoss,
}
