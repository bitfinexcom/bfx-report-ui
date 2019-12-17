import types from './constants'

/**
 * Create an action to fetch public Trades data.
 * @param {Object} options
 */
export function fetchPublicTrades(options = {}) {
  return {
    type: types.FETCH_PUBLIC_TRADES,
    payload: options,
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
 * Create an action to refresh public Trades.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update public Trades.
 * @param {Object[]} data data set
 */
export function updatePublicTrades(data) {
  return {
    type: types.UPDATE_PUBLIC_TRADES,
    payload: {
      data,
    },
  }
}

/**
 * Create an action to set current pair.
 * @param {string} pair pair
 */
export function setTargetPair(pair) {
  return {
    type: types.SET_PAIR,
    payload: pair,
  }
}

export default {
  fetchFail,
  fetchPublicTrades,
  refresh,
  setTargetPair,
  updatePublicTrades,
}
