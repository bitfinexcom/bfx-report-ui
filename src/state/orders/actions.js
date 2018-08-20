import types from './constants'

/**
 * Create an action to fetch Orders data.
 */
export function fetchOrders() {
  return {
    type: types.FETCH_ORDERS,
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
 * Create an action to update Orders.
 * @param {Object[]} payload data set
 */
export function updateOrders(payload) {
  return {
    type: types.UPDATE_ORDERS,
    payload,
  }
}

export default {
  fetchFail,
  fetchOrders,
  fetchNextOrders,
  fetchPrevOrders,
  jumpPage,
  updateOrders,
}
