import types from './constants'

/**
 * Create an action to fetch Candles.
 * @param {string} type contains data type for fetching (candles/trades)
 */
export function fetchData(type) {
  return {
    type: types.FETCH,
    payload: type,
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
 * @param {Object} payload data
 * @param {Object} [payload.candles] candles response
 * @param {Object[]} payload.candles.res candles data set
 * @param {number} payload.candles.nextPage nextPage mts
 * @param {Object} [payload.trades] trades response
 * @param {Object[]} payload.trades.res trades data set
 * @param {number} payload.trades.nextPage nextPage mts
 */
export function updateData(payload) {
  return {
    type: types.UPDATE,
    payload,
  }
}

export function setChartLoading(payload) {
  return {
    type: types.LOADING,
    payload,
  }
}

export default {
  fetchFail,
  fetchData,
  refresh,
  setParams,
  updateData,
  setChartLoading,
}
