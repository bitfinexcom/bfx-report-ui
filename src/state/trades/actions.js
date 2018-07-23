import types from './constants'

/**
 * Create an action to fetch Trades data.
 */
export function fetchTrades() {
  return {
    type: types.FETCH_TRADES,
  }
}

export default {
  fetchTrades,
}
