import types from './constants'

/**
 * Create an action to fetch Withdrawals data.
 * @param {string} symbol symbol param from url
 */
export function fetchWithdrawals(symbol) {
  return {
    type: types.FETCH_WITHDRAWALS,
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
 * Create an action to fetch next Withdrawals data.
 * @param {number} queryLimit query limit
 */
export function fetchNextWithdrawals(queryLimit) {
  return {
    type: types.FETCH_NEXT_WITHDRAWALS,
    payload: queryLimit,
  }
}

/**
 * Create an action to fetch prev Withdrawals data.
 * @param {number} queryLimit query limit
 */
export function fetchPrevWithdrawals(queryLimit) {
  return {
    type: types.FETCH_PREV_WITHDRAWALS,
    payload: queryLimit,
  }
}

/**
 * Create an action to jump to a specific Withdrawals page.
 * @param {number} page page number
 * @param {number} queryLimit query limit
 */
export function jumpPage(page, queryLimit) {
  return {
    type: types.JUMP_WITHDRAWALS_PAGE,
    payload: {
      page,
      queryLimit,
    },
  }
}

/**
 * Create an action to refresh Withdrawals.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Withdrawals.
 * @param {Object[]} data data set
 * @param {number} limit query limit
 * @param {number} pageSize page size
 */
export function updateWithdrawals(data, limit, pageSize) {
  return {
    type: types.UPDATE_WITHDRAWALS,
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
  fetchWithdrawals,
  fetchNextWithdrawals,
  fetchPrevWithdrawals,
  jumpPage,
  refresh,
  removeTargetSymbol,
  setTargetSymbols,
  updateWithdrawals,
}
