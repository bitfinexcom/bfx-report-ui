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
 * @param {number} queryLimit query limit
 */
export function fetchNextOrders(queryLimit) {
  return {
    type: types.FETCH_NEXT_ORDERS,
    payload: queryLimit,
  }
}

/**
 * Create an action to fetch prev Orders data.
 * @param {number} queryLimit query limit
 */
export function fetchPrevOrders(queryLimit) {
  return {
    type: types.FETCH_PREV_ORDERS,
    payload: queryLimit,
  }
}

/**
 * Create an action to jump to a specific Orders page.
 * @param {number} page page number
 * @param {number} queryLimit query limit
 */
export function jumpPage(page, queryLimit) {
  return {
    type: types.JUMP_ORDERS_PAGE,
    payload: {
      page,
      queryLimit,
    },
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
 * @param {Object[]} data data set
 * @param {number} limit query limit
 * @param {number} pageSize page size
 */
export function updateOrders(data, limit, pageSize) {
  return {
    type: types.UPDATE_ORDERS,
    payload: {
      data,
      limit,
      pageSize,
    },
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
