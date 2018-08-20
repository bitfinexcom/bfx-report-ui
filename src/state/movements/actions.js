import types from './constants'

/**
 * Create an action to fetch Movements data.
 */
export function fetchMovements() {
  return {
    type: types.FETCH_MOVEMENTS,
  }
}

/**
 * Create an action to note fetch fail.
 */
export function fetchFail() {
  return {
    type: types.FETCH_FAIL,
  }
}

/**
 * Create an action to fetch next Movements data.
 */
export function fetchNextMovements() {
  return {
    type: types.FETCH_NEXT_MOVEMENTS,
  }
}

/**
 * Create an action to fetch prev Movements data.
 */
export function fetchPrevMovements() {
  return {
    type: types.FETCH_PREV_MOVEMENTS,
  }
}

/**
 * Create an action to jump to a specific Movements page.
 * @param {number} payload page number
 */
export function jumpPage(payload) {
  return {
    type: types.JUMP_MOVEMENTS_PAGE,
    payload,
  }
}

/**
 * Create an action to update Movements.
 * @param {Object[]} payload data set
 */
export function updateMovements(payload) {
  return {
    type: types.UPDATE_MOVEMENTS,
    payload,
  }
}

export default {
  fetchFail,
  fetchMovements,
  fetchNextMovements,
  fetchPrevMovements,
  jumpPage,
  updateMovements,
}
