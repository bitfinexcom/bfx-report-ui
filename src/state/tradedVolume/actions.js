import types from './constants'

/**
 * Create an action to fetch Traded Volume data.
 */
export function fetchTradedVolume() {
  return {
    type: types.FETCH_TRADED_VOLUME,
  }
}

/**
 * Create an action to set options for Traded Volume data.
 * @param {object} payload object contains options
 */
export function setParams(payload) {
  return {
    type: types.SET_PARAMS,
    payload,
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
 * Create an action to refresh Traded Volume.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Traded Volume.
 * @param {Object[]} payload data set
 */
export function updateTradedVolume(payload) {
  return {
    type: types.UPDATE_TRADED_VOLUME,
    payload,
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
  fetchFail,
  fetchTradedVolume,
  refresh,
  setParams,
  updateTradedVolume,
  setTargetPairs,
  addTargetPair,
  removeTargetPair,
  clearTargetPairs,
}
