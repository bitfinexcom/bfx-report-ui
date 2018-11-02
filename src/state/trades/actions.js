import types from './constants'

/**
 * Create an action to fetch Trades data.
 * @param {string} pair pair param from url
 */
export function fetchTrades(pair) {
  return {
    type: types.FETCH_TRADES,
    payload: pair,
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
 * Create an action to fetch next Trades data.
 */
export function fetchNextTrades() {
  return {
    type: types.FETCH_NEXT_TRADES,
  }
}

/**
 * Create an action to fetch prev Trades data.
 */
export function fetchPrevTrades() {
  return {
    type: types.FETCH_PREV_TRADES,
  }
}

/**
 * Create an action to jump to a specific Trades page.
 * @param {number} payload page number
 */
export function jumpPage(payload) {
  return {
    type: types.JUMP_TRADES_PAGE,
    payload,
  }
}

/**
 * Create an action to refresh trades.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Trades.
 * @param {Object[]} payload data set
 */
export function updateTrades(payload) {
  return {
    type: types.UPDATE_TRADES,
    payload,
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
  fetchTrades,
  fetchNextTrades,
  fetchPrevTrades,
  jumpPage,
  refresh,
  setTargetPair,
  updateTrades,
}
