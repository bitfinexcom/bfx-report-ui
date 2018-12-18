import types from './constants'

/**
 * Create an action to fetch Positions data.
 * @param {string} pair pair param from url
 */
export function fetchPositions(pair) {
  return {
    type: types.FETCH_POSITIONS,
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
 * Create an action to fetch next Positions data.
 */
export function fetchNextPositions() {
  return {
    type: types.FETCH_NEXT_POSITIONS,
  }
}

/**
 * Create an action to fetch prev Positions data.
 */
export function fetchPrevPositions() {
  return {
    type: types.FETCH_PREV_POSITIONS,
  }
}

/**
 * Create an action to jump to a specific Positions page.
 * @param {number} payload page number
 */
export function jumpPage(payload) {
  return {
    type: types.JUMP_POSITIONS_PAGE,
    payload,
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
 * @param {Object[]} payload data set
 */
export function updatePositions(payload) {
  return {
    type: types.UPDATE_POSITIONS,
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
  fetchPositions,
  fetchNextPositions,
  fetchPrevPositions,
  jumpPage,
  refresh,
  removeTargetPair,
  setTargetPairs,
  updatePositions,
}
