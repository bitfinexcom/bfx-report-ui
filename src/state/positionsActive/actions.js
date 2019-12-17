import types from './constants'

/**
 * Create an action to fetch Positions(active) data.
 */
export function fetchAPositions() {
  return {
    type: types.FETCH_APOSITIONS,
  }
}

/**
 * Create an action to note fetch fail.
 * @param {Object} payload fail message
 */
export function fetchFail(payload) {
  return {
    type: types.FETCH_FAIL,
    payload,
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
 */
export function updateAPositions(data) {
  return {
    type: types.UPDATE_APOSITIONS,
    payload: {
      data,
    },
  }
}

export default {
  fetchFail,
  fetchAPositions,
  refresh,
  updateAPositions,
}
