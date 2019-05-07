import types from './constants'

/**
 * Create an action to fetch Risk data.
 * @param {object} payload object contains options for fetching Risk
 */
export function fetchRisk(payload) {
  return {
    type: types.FETCH_RISK,
    payload,
  }
}

/**
 * Create an action to set options for Risk data.
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
 * Create an action to refresh Risk.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Risk.
 * @param {Object[]} payload data set
 */
export function updateRisk(payload) {
  return {
    type: types.UPDATE_RISK,
    payload,
  }
}

export default {
  fetchFail,
  fetchRisk,
  refresh,
  setParams,
  updateRisk,
}
