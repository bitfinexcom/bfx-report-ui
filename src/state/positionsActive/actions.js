import types from './constants'

/**
 * Create an action to fetch Positions(active) data.
 * @param {string} pair pair param from url
 */
export function fetchAPositions(pair) {
  return {
    type: types.FETCH_APOSITIONS,
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
 * Create an action to fetch next Positions(active) data.
 * @param {number} queryLimit query limit
 */
export function fetchNextAPositions(queryLimit) {
  return {
    type: types.FETCH_NEXT_APOSITIONS,
    payload: queryLimit,
  }
}

/**
 * Create an action to fetch prev Positions(active) data.
 * @param {number} queryLimit query limit
 */
export function fetchPrevAPositions(queryLimit) {
  return {
    type: types.FETCH_PREV_APOSITIONS,
    payload: queryLimit,
  }
}

/**
 * Create an action to jump to a specific Positions(active) page.
 * @param {number} page page number
 * @param {number} queryLimit query limit
 */
export function jumpPage(page, queryLimit) {
  return {
    type: types.JUMP_APOSITIONS_PAGE,
    payload: {
      page,
      queryLimit,
    },
  }
}

/**
 * Create an action to refresh Positions(active).
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Positions(active).
 * @param {Object[]} data data set
 * @param {number} limit query limit
 * @param {number} pageSize page size
 */
export function updateAPositions(data, limit, pageSize) {
  return {
    type: types.UPDATE_APOSITIONS,
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
  fetchAPositions,
  fetchNextAPositions,
  fetchPrevAPositions,
  jumpPage,
  refresh,
  removeTargetPair,
  setTargetPairs,
  updateAPositions,
}
