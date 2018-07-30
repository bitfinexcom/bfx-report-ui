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
  fetchMovements,
  fetchNextMovements,
  fetchPrevMovements,
  updateMovements,
}
