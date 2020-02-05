import types from './constants'

/**
 * Create an action to fetch Candles.
 * @param {object} payload object contains options for fetching Candles
 */
export function fetchData(payload) {
  return {
    type: types.FETCH,
    payload,
  }
}

/**
 * Create an action to set options for Candles.
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
 * Create an action to refresh Candles.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Candles.
 * @param {Object[]} payload data set
 */
export function updateData(payload) {
  return {
    type: types.UPDATE,
    payload,
  }
}

export default {
  fetchFail,
  fetchData,
  refresh,
  setParams,
  updateData,
}
