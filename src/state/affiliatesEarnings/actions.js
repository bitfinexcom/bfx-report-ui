import types from './constants'

/**
 * Create an action to fetch Affiliates Earnings data.
 */
export function fetchAffiliatesEarnings() {
  return {
    type: types.FETCH_AFFILIATES_EARNINGS,
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
 * Create an action to fetch next Affiliates Earnings data.
 * @param {number} queryLimit query limit
 */
export function fetchNextAffiliatesEarnings(queryLimit) {
  return {
    type: types.FETCH_NEXT_AFFILIATES_EARNINGS,
    payload: queryLimit,
  }
}

/**
 * Create an action to fetch prev Affiliates Earnings data.
 * @param {number} queryLimit query limit
 */
export function fetchPrevAffiliatesEarnings(queryLimit) {
  return {
    type: types.FETCH_PREV_AFFILIATES_EARNINGS,
    payload: queryLimit,
  }
}

/**
 * Create an action to jump to a specific Affiliates Earnings page.
 * @param {number} page page number
 * @param {number} queryLimit query limit
 */
export function jumpPage(page, queryLimit) {
  return {
    type: types.JUMP_AFFILIATES_EARNINGS_PAGE,
    payload: {
      page,
      queryLimit,
    },
  }
}

/**
 * Create an action to refresh Affiliates Earnings.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Affiliates Earnings.
 * @param {Object[]} data data set
 * @param {number} limit query limit
 * @param {number} pageSize page size
 */
export function updateAffiliatesEarnings(data, limit, pageSize) {
  return {
    type: types.UPDATE_AFFILIATES_EARNINGS,
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
  fetchAffiliatesEarnings,
  fetchNextAffiliatesEarnings,
  fetchPrevAffiliatesEarnings,
  jumpPage,
  refresh,
  removeTargetSymbol,
  setTargetSymbols,
  updateAffiliatesEarnings,
}
