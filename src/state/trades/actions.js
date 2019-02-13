import types from './constants'

/**
 * Create an action to fetch Trades data.
 * @param {string} pair pair param from url
 */
export function fetchTrades(pair) {
  return {
    type: types.FETCH_TRADES,
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
 * Create an action to fetch next Trades data.
 * @param {number} queryLimit query limit
 */
export function fetchNextTrades(queryLimit) {
  return {
    type: types.FETCH_NEXT_TRADES,
    payload: queryLimit,
  }
}

/**
 * Create an action to fetch prev Trades data.
 * @param {number} queryLimit query limit
 */
export function fetchPrevTrades(queryLimit) {
  return {
    type: types.FETCH_PREV_TRADES,
    payload: queryLimit,
  }
}

/**
 * Create an action to jump to a specific Trades page.
 * @param {number} page page number
 * @param {number} queryLimit query limit
 */
export function jumpPage(page, queryLimit) {
  return {
    type: types.JUMP_TRADES_PAGE,
    payload: {
      page,
      queryLimit,
    },
  }
}

/**
 * Create an action to refresh trades.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Trades.
 * @param {Object[]} data data set
 * @param {number} limit query limit
 * @param {number} pageSize page size
 */
export function updateTrades(data, limit, pageSize) {
  return {
    type: types.UPDATE_TRADES,
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
  fetchTrades,
  fetchNextTrades,
  fetchPrevTrades,
  jumpPage,
  refresh,
  setTargetPairs,
  removeTargetPair,
  updateTrades,
}
