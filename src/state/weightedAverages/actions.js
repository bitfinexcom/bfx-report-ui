import types from './constants'

/**
 * Create an action to fetch derivatives status data.
 */
export function fetchWeightedAwerages() {
  return {
    type: types.FETCH_WEIGHTED_AVERAGES,
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
 * Create an action to refresh derivatives status.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update derivatives.
 * @param {Object[]} data
 */
export function updateWeightedAwerages(data) {
  return {
    type: types.UPDATE_WEIGHTED_AVERAGES,
    payload: {
      data,
    },
  }
}

/**
 * Create an action to set current pair.
 * @param {string[]} pairs
 */
export function setTargetPairs(pairs) {
  return {
    type: types.SET_PAIRS,
    payload: pairs,
  }
}

/**
 * Create an action to add target pair.
 * @param {string} pair
 */
export function addTargetPair(pair) {
  return {
    type: types.ADD_PAIR,
    payload: pair,
  }
}

/**
 * Create an action to remove target pair.
 * @param {string} pair
 */
export function removeTargetPair(pair) {
  return {
    type: types.REMOVE_PAIR,
    payload: pair,
  }
}

/**
 * Create an action to clear target pairs.
 */
export function clearTargetPairs() {
  return {
    type: types.CLEAR_PAIRS,
  }
}

export default {
  fetchWeightedAwerages,
  clearTargetPairs,
  fetchFail,
  refresh,
  updateWeightedAwerages,
  setTargetPairs,
  addTargetPair,
  removeTargetPair,
}
