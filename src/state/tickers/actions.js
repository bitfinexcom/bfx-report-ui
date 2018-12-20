import types from './constants'

/**
 * Create an action to fetch Tickers data.
 * @param {string} pair pair param from url
 */
export function fetchTickers(pair) {
  return {
    type: types.FETCH_TICKERS,
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
 * Create an action to fetch next Tickers data.
 */
export function fetchNextTickers() {
  return {
    type: types.FETCH_NEXT_TICKERS,
  }
}

/**
 * Create an action to fetch prev Tickers data.
 */
export function fetchPrevTickers() {
  return {
    type: types.FETCH_PREV_TICKERS,
  }
}

/**
 * Create an action to jump to a specific Tickers page.
 * @param {number} payload page number
 */
export function jumpPage(payload) {
  return {
    type: types.JUMP_TICKERS_PAGE,
    payload,
  }
}

/**
 * Create an action to refresh Tickers.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Tickers.
 * @param {Object[]} payload data set
 */
export function updateTickers(payload) {
  return {
    type: types.UPDATE_TICKERS,
    payload,
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
  addTargetPair,
  fetchFail,
  fetchTickers,
  fetchNextTickers,
  fetchPrevTickers,
  jumpPage,
  refresh,
  removeTargetPair,
  setTargetPairs,
  updateTickers,
}
