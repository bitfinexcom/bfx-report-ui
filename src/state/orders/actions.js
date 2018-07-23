import types from './constants'

/**
 * Create an action to fetch Orders data.
 */
export function fetchOrders() {
  return {
    type: types.FETCH_ORDERS,
  }
}

export default {
  fetchOrders,
}
