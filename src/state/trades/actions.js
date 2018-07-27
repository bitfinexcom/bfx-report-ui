import types from './constants'

/**
 * Create an action to fetch Trades data.
 */
export function fetchTrades() {
  return {
    type: types.FETCH_TRADES,
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

export default {
  fetchTrades,
  fetchNextTrades,
  fetchPrevTrades,
}
