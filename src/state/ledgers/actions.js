import types from './constants'

/**
 * Create an action to fetch Ledgers data.
 */
export function fetchLedgers() {
  return {
    type: types.FETCH_LEDGERS,
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
 * Create an action to fetch next Ledgers data.
 * @param {number} queryLimit query limit
 */
export function fetchNextLedgers(queryLimit) {
  return {
    type: types.FETCH_NEXT_LEDGERS,
    payload: queryLimit,
  }
}

/**
 * Create an action to fetch prev Ledgers data.
 * @param {number} queryLimit query limit
 */
export function fetchPrevLedgers(queryLimit) {
  return {
    type: types.FETCH_PREV_LEDGERS,
    payload: queryLimit,
  }
}

/**
 * Create an action to jump to a specific Ledgers page.
 * @param {number} page page number
 * @param {number} queryLimit query limit
 */
export function jumpPage(page, queryLimit) {
  return {
    type: types.JUMP_LEDGERS_PAGE,
    payload: {
      page,
      queryLimit,
    },
  }
}

/**
 * Create an action to refresh ledgers.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Ledgers.
 * @param {Object[]} data data set
 * @param {number} limit query limit
 * @param {number} pageSize page size
 */
export function updateLedgers(data, limit, pageSize) {
  return {
    type: types.UPDATE_LEDGERS,
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
  fetchLedgers,
  fetchNextLedgers,
  fetchPrevLedgers,
  jumpPage,
  refresh,
  removeTargetSymbol,
  setTargetSymbols,
  updateLedgers,
}
