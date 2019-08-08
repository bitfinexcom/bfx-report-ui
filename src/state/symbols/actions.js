import types from './constants'

/**
 * Create an action to fetch symbols.
 */
export function fetchSymbols() {
  return {
    type: types.FETCH_SYMBOLS,
  }
}

/**
 * Create an action to update all symbols.
 * @param {object} symbols object contains coins and pairs
 */
export function updateSymbols(symbols) {
  return {
    type: types.UPDATE_SYMBOLS,
    payload: symbols,
  }
}

export default {
  fetchSymbols,
  updateSymbols,
}
