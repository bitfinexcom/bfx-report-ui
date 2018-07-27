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

export default {
  fetchOrders,
  fetchNextOrders,
  fetchPrevOrders,
}
