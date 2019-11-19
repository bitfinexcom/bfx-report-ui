import types from './constants'

/**
 * Create an action to fetch Positions data.
 */
export function fetchPositions() {
  return {
    type: types.FETCH_POSITIONS,
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
 * Create an action to fetch next Positions data.
 * @param {number} queryLimit query limit
 */
export function fetchNextPositions(queryLimit) {
  return {
    type: types.FETCH_NEXT_POSITIONS,
    payload: queryLimit,
  }
}

/**
 * Create an action to fetch prev Positions data.
 * @param {number} queryLimit query limit
 */
export function fetchPrevPositions(queryLimit) {
  return {
    type: types.FETCH_PREV_POSITIONS,
    payload: queryLimit,
  }
}

/**
 * Create an action to jump to a specific Positions page.
 * @param {number} page page number
 * @param {number} queryLimit query limit
 */
export function jumpPage(page, queryLimit) {
  return {
    type: types.JUMP_POSITIONS_PAGE,
    payload: {
      page,
      queryLimit,
    },
  }
}

/**
 * Create an action to refresh Positions.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Positions.
 * @param {Object[]} data data set
 * @param {number} limit query limit
 * @param {number} pageSize page size
 */
export function updatePositions(data, limit, pageSize) {
  return {
    type: types.UPDATE_POSITIONS,
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
  fetchPositions,
  fetchNextPositions,
  fetchPrevPositions,
  jumpPage,
  refresh,
  removeTargetPair,
  setTargetPairs,
  updatePositions,
}
