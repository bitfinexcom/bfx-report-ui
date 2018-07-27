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

export default {
  fetchMovements,
  fetchNextMovements,
  fetchPrevMovements,
}
