import types from './constants'

/**
 * Create an action to update all symbols.
 * @param {string[]}  symbols array of symbols
 */
export function updateSymbols(symbols) {
  return {
    type: types.UPDATE_SYMBOLS,
    payload: symbols,
  }
}

export default {
  updateSymbols,
}
