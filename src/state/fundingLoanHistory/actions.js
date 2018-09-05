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
 */
export function fetchNextFLoan() {
  return {
    type: types.FETCH_NEXT_FLOAN,
  }
}

/**
 * Create an action to fetch prev funding loan history data.
 */
export function fetchPrevFLoan() {
  return {
    type: types.FETCH_PREV_FLOAN,
  }
}

/**
 * Create an action to jump to a specific funding loan history page.
 * @param {number} payload page number
 */
export function jumpPage(payload) {
  return {
    type: types.JUMP_FLOAN_PAGE,
    payload,
  }
}

/**
 * Create an action to update funding loan history.
 * @param {Object[]} payload data set
 */
export function updateFLoan(payload) {
  return {
    type: types.UPDATE_FLOAN,
    payload,
  }
}

export default {
  fetchFail,
  fetchFLoan,
  fetchNextFLoan,
  fetchPrevFLoan,
  jumpPage,
  updateFLoan,
}
