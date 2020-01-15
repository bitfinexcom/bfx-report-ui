import types from './constants'

/**
 * Create an action to fetch Order Trades data.
 */
export function fetchOrderTrades() {
  return {
    type: types.FETCH_ORDER_TRADES,
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
 * Create an action to refresh Order Trades.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Order Trades.
 * @param {Object[]} data
 */
export function updateOrderTrades(data) {
  return {
    type: types.UPDATE_ORDER_TRADES,
    payload: {
      data,
    },
  }
}

/**
 * Create an action to set current pair.
 * @param {string} pair
 */
export function setTargetPair(pair) {
  return {
    type: types.SET_PAIRS,
    payload: pair,
  }
}

/**
 * Create an action to set params.
 * @param {object} params id and/or pair
 */
export function setParams(params) {
  return {
    type: types.SET_PARAMS,
    payload: params,
  }
}

export default {
  fetchFail,
  fetchOrderTrades,
  refresh,
  setTargetPair,
  updateOrderTrades,
}
