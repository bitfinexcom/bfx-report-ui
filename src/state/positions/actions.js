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

export default {
  fetchFail,
  fetchPositions,
  fetchNextPositions,
  fetchPrevPositions,
  jumpPage,
  refresh,
  updatePositions,
}
