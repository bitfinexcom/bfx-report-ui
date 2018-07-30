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
  fetchOrders,
  fetchNextOrders,
  fetchPrevOrders,
  updateOrders,
}
