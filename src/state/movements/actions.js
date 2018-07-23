import types from './constants'

/**
 * Create an action to fetch Movements data.
 */
export function fetchMovements() {
  return {
    type: types.FETCH_MOVEMENTS,
  }
}

export default {
  fetchMovements,
}
