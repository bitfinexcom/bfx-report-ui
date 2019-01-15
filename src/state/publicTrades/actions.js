import types from './constants'

/**
 * Create an action to fetch public Trades data.
 * @param {string} pair pair param from url
 */
export function fetchPublicTrades(pair) {
  return {
    type: types.FETCH_PUBLIC_TRADES,
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
 * Create an action to fetch next public Trades data.
 * @param {number} queryLimit query limit
 */
export function fetchNextPublicTrades(queryLimit) {
  return {
    type: types.FETCH_NEXT_PUBLIC_TRADES,
    payload: queryLimit,
  }
}

/**
 * Create an action to fetch prev public Trades data.
 * @param {number} queryLimit query limit
 */
export function fetchPrevPublicTrades(queryLimit) {
  return {
    type: types.FETCH_PREV_PUBLIC_TRADES,
    payload: queryLimit,
  }
}

/**
 * Create an action to jump to a specific public Trades page.
 * @param {number} page page number
 * @param {number} queryLimit query limit
 */
export function jumpPage(page, queryLimit) {
  return {
    type: types.JUMP_PUBLIC_TRADES_PAGE,
    payload: {
      page,
      queryLimit,
    },
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
 * @param {Object[]} payload data set
 */
export function updatePublicTrades(payload) {
  return {
    type: types.UPDATE_PUBLIC_TRADES,
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
  fetchPublicTrades,
  fetchNextPublicTrades,
  fetchPrevPublicTrades,
  jumpPage,
  refresh,
  setTargetPair,
  updatePublicTrades,
}
