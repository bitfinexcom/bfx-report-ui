import types from './constants'

/**
 * Create an action to fetch Movements data.
 */
export function fetchMovements() {
  return {
    type: types.FETCH_MOVEMENTS,
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
 * @param {number} queryLimit query limit
 */
export function fetchNextMovements(queryLimit) {
  return {
    type: types.FETCH_NEXT_MOVEMENTS,
    payload: queryLimit,
  }
}

/**
 * Create an action to fetch prev Movements data.
 * @param {number} queryLimit query limit
 */
export function fetchPrevMovements(queryLimit) {
  return {
    type: types.FETCH_PREV_MOVEMENTS,
    payload: queryLimit,
  }
}

/**
 * Create an action to jump to a specific Movements page.
 * @param {number} page page number
 * @param {number} queryLimit query limit
 */
export function jumpPage(page, queryLimit) {
  return {
    type: types.JUMP_MOVEMENTS_PAGE,
    payload: {
      page,
      queryLimit,
    },
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
 * @param {Object[]} data data set
 * @param {number} limit query limit
 * @param {number} pageSize page size
 */
export function updateMovements(data, limit, pageSize) {
  return {
    type: types.UPDATE_MOVEMENTS,
    payload: {
      data,
      limit,
      pageSize,
    },
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
