import types from './constants'

/**
 * Create an action to fetch Orders data.
 * @param {string} pair pair param from url
 */
export function fetchOrders(pair) {
  return {
    type: types.FETCH_ORDERS,
    payload: pair,
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
 * Create an action to fetch next Orders data.
 */
export function fetchNextOrders() {
  return {
    type: types.FETCH_NEXT_ORDERS,
  }
}

/**
 * Create an action to fetch prev Orders data.
 */
export function fetchPrevOrders() {
  return {
    type: types.FETCH_PREV_ORDERS,
  }
}

/**
 * Create an action to jump to a specific Orders page.
 * @param {number} payload page number
 */
export function jumpPage(payload) {
  return {
    type: types.JUMP_ORDERS_PAGE,
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
 * @param {Object[]} payload data set
 */
export function updateOrders(payload) {
  return {
    type: types.UPDATE_ORDERS,
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
  addTargetPair,
  fetchFail,
  fetchOrders,
  fetchNextOrders,
  fetchPrevOrders,
  jumpPage,
  refresh,
  removeTargetPair,
  setTargetPairs,
  updateOrders,
}
