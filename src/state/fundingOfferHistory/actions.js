import types from './constants'

/**
 * Create an action to fetch funding offer history data.
 * @param {string} symbol symbol param from url
 */
export function fetchFOffer(symbol) {
  return {
    type: types.FETCH_FOFFER,
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
 * Create an action to fetch next funding offer history data.
 * @param {number} queryLimit query limit
 */
export function fetchNextFOffer(queryLimit) {
  return {
    type: types.FETCH_NEXT_FOFFER,
    payload: queryLimit,
  }
}

/**
 * Create an action to fetch prev funding offer history data.
 * @param {number} queryLimit query limit
 */
export function fetchPrevFOffer(queryLimit) {
  return {
    type: types.FETCH_PREV_FOFFER,
    payload: queryLimit,
  }
}

/**
 * Create an action to jump to a specific funding offer history page.
 * @param {number} page page number
 * @param {number} queryLimit query limit
 */
export function jumpPage(page, queryLimit) {
  return {
    type: types.JUMP_FOFFER_PAGE,
    payload: {
      page,
      queryLimit,
    },
  }
}

/**
 * Create an action to refresh funding offer history.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update funding offer history.
 * @param {Object[]} data data set
 * @param {number} limit query limit
 * @param {number} pageSize page size
 */
export function updateFOffer(data, limit, pageSize) {
  return {
    type: types.UPDATE_FOFFER,
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
  fetchFOffer,
  fetchNextFOffer,
  fetchPrevFOffer,
  jumpPage,
  refresh,
  removeTargetSymbol,
  setTargetSymbols,
  updateFOffer,
}
