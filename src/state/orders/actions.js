import types from './constants'

/**
 * Create an action to fetch Orders data.
 * @param {Object} options
 */
export function fetchOrders(options = {}) {
  return {
    type: types.FETCH_ORDERS,
    payload: options,
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
 * Create an action to refresh orders.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Orders.
 * @param {Object[]} data
 */
export function updateOrders(data) {
  return {
    type: types.UPDATE_ORDERS,
    payload: {
      data,
    },
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

export default {
  addTargetPair,
  fetchFail,
  fetchOrders,
  refresh,
  removeTargetPair,
  setTargetPairs,
  updateOrders,
}
