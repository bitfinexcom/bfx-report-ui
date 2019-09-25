import types from './constants'

/**
 * Create an action to fetch derivatives status data.
 * @param {string} pairs pairs param from url
 */
export function fetchDerivatives(pairs) {
  return {
    type: types.FETCH_DERIVATIVES,
    payload: pairs,
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
 * Create an action to refresh derivatives status.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update derivatives.
 * @param {Object[]} data data set
 */
export function updateDerivatives(data) {
  return {
    type: types.UPDATE_DERIVATIVES,
    payload: {
      data,
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
  fetchDerivatives,
  fetchFail,
  refresh,
  updateDerivatives,
  setTargetPairs,
  addTargetPair,
  removeTargetPair,
}
