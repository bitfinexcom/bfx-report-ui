import types from './constants'

/**
 * Create an action to fetch funding credit history data.
 * @param {string} symbol symbol param from url
 */
export function fetchFCredit(symbol) {
  return {
    type: types.FETCH_FCREDIT,
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
 * Create an action to fetch next funding credit history data.
 */
export function fetchNextFCredit() {
  return {
    type: types.FETCH_NEXT_FCREDIT,
  }
}

/**
 * Create an action to fetch prev funding credit history data.
 */
export function fetchPrevFCredit() {
  return {
    type: types.FETCH_PREV_FCREDIT,
  }
}

/**
 * Create an action to jump to a specific funding credit history page.
 * @param {number} payload page number
 */
export function jumpPage(payload) {
  return {
    type: types.JUMP_FCREDIT_PAGE,
    payload,
  }
}

/**
 * Create an action to refresh funding credit history.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update funding credit history.
 * @param {Object[]} payload data set
 */
export function updateFCredit(payload) {
  return {
    type: types.UPDATE_FCREDIT,
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
  fetchFCredit,
  fetchNextFCredit,
  fetchPrevFCredit,
  jumpPage,
  refresh,
  removeTargetSymbol,
  setTargetSymbols,
  updateFCredit,
}
