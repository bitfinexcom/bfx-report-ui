import types from './constants'

/**
 * Create an action to fetch funding offer history data.
 */
export function fetchFOffer() {
  return {
    type: types.FETCH_FOFFER,
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
 */
export function fetchNextFOffer() {
  return {
    type: types.FETCH_NEXT_FOFFER,
  }
}

/**
 * Create an action to fetch prev funding offer history data.
 */
export function fetchPrevFOffer() {
  return {
    type: types.FETCH_PREV_FOFFER,
  }
}

/**
 * Create an action to jump to a specific funding offer history page.
 * @param {number} payload page number
 */
export function jumpPage(payload) {
  return {
    type: types.JUMP_FOFFER_PAGE,
    payload,
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
 * @param {Object[]} payload data set
 */
export function updateFOffer(payload) {
  return {
    type: types.UPDATE_FOFFER,
    payload,
  }
}

/**
 * Create an action to set target symbol.
 * @param {string} symbol symbol
 */
export function setTargetSymbol(symbol) {
  return {
    type: types.SET_SYMBOL,
    payload: symbol,
  }
}

export default {
  fetchFail,
  fetchFOffer,
  fetchNextFOffer,
  fetchPrevFOffer,
  jumpPage,
  refresh,
  setTargetSymbol,
  updateFOffer,
}
