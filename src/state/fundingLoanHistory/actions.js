import types from './constants'

/**
 * Create an action to fetch funding loan history data.
 */
export function fetchFLoan() {
  return {
    type: types.FETCH_FLOAN,
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
 * Create an action to fetch next funding loan history data.
 * @param {number} queryLimit query limit
 */
export function fetchNextFLoan(queryLimit) {
  return {
    type: types.FETCH_NEXT_FLOAN,
    payload: queryLimit,
  }
}

/**
 * Create an action to fetch prev funding loan history data.
 * @param {number} queryLimit query limit
 */
export function fetchPrevFLoan(queryLimit) {
  return {
    type: types.FETCH_PREV_FLOAN,
    payload: queryLimit,
  }
}

/**
 * Create an action to jump to a specific funding loan history page.
 * @param {number} page page number
 * @param {number} queryLimit query limit
 */
export function jumpPage(page, queryLimit) {
  return {
    type: types.JUMP_FLOAN_PAGE,
    payload: {
      page,
      queryLimit,
    },
  }
}

/**
 * Create an action to refresh funding loan history.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update funding loan history.
 * @param {Object[]} data data set
 * @param {number} limit query limit
 * @param {number} pageSize page size
 */
export function updateFLoan(data, limit, pageSize) {
  return {
    type: types.UPDATE_FLOAN,
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
  fetchFLoan,
  fetchNextFLoan,
  fetchPrevFLoan,
  jumpPage,
  refresh,
  removeTargetSymbol,
  setTargetSymbols,
  updateFLoan,
}
