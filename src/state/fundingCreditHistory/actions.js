import types from './constants'

/**
 * Create an action to fetch funding credit history data.
 */
export function fetchFCredit() {
  return {
    type: types.FETCH_FCREDIT,
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
 * Create an action to update funding credit history.
 * @param {Object[]} payload data set
 */
export function updateFCredit(payload) {
  return {
    type: types.UPDATE_FCREDIT,
    payload,
  }
}

export default {
  fetchFail,
  fetchFCredit,
  fetchNextFCredit,
  fetchPrevFCredit,
  jumpPage,
  updateFCredit,
}
