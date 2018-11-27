import types from './constants'

/**
 * Create an action to fetch Movements data.
 * @param {string} symbol symbol param from url
 */
export function fetchMovements(symbol) {
  return {
    type: types.FETCH_MOVEMENTS,
    payload: symbol,
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
 * Create an action to fetch next Movements data.
 */
export function fetchNextMovements() {
  return {
    type: types.FETCH_NEXT_MOVEMENTS,
  }
}

/**
 * Create an action to fetch prev Movements data.
 */
export function fetchPrevMovements() {
  return {
    type: types.FETCH_PREV_MOVEMENTS,
  }
}

/**
 * Create an action to jump to a specific Movements page.
 * @param {number} payload page number
 */
export function jumpPage(payload) {
  return {
    type: types.JUMP_MOVEMENTS_PAGE,
    payload,
  }
}

/**
 * Create an action to refresh movements.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Movements.
 * @param {Object[]} payload data set
 */
export function updateMovements(payload) {
  return {
    type: types.UPDATE_MOVEMENTS,
    payload,
  }
}

/**
 * Create an action to set target symbol.
 * @param {string[]} symbols symbols
 */
export function setTargetSymbols(symbols) {
  return {
    type: types.SET_SYMBOLS,
    payload: symbols,
  }
}

/**
 * Create an action to add target symbol.
 * @param {string} symbol symbol
 */
export function addTargetSymbol(symbol) {
  return {
    type: types.ADD_SYMBOL,
    payload: symbol,
  }
}

/**
 * Create an action to remove target symbol.
 * @param {string} symbol symbol
 */
export function removeTargetSymbol(symbol) {
  return {
    type: types.REMOVE_SYMBOL,
    payload: symbol,
  }
}

export default {
  addTargetSymbol,
  fetchFail,
  fetchMovements,
  fetchNextMovements,
  fetchPrevMovements,
  jumpPage,
  refresh,
  removeTargetSymbol,
  setTargetSymbols,
  updateMovements,
}
