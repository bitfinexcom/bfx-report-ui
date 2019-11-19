import types from './constants'

/**
 * Create an action to fetch public Funding data.
 */
export function fetchPublicFunding() {
  return {
    type: types.FETCH_PUBLIC_FUNDING,
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
 * Create an action to fetch next public Funding data.
 * @param {number} queryLimit query limit
 */
export function fetchNextPublicFunding(queryLimit) {
  return {
    type: types.FETCH_NEXT_PUBLIC_FUNDING,
    payload: queryLimit,
  }
}

/**
 * Create an action to fetch prev public Funding data.
 * @param {number} queryLimit query limit
 */
export function fetchPrevPublicFunding(queryLimit) {
  return {
    type: types.FETCH_PREV_PUBLIC_FUNDING,
    payload: queryLimit,
  }
}

/**
 * Create an action to jump to a specific public Funding page.
 * @param {number} page page number
 * @param {number} queryLimit query limit
 */
export function jumpPage(page, queryLimit) {
  return {
    type: types.JUMP_PUBLIC_FUNDING_PAGE,
    payload: {
      page,
      queryLimit,
    },
  }
}

/**
 * Create an action to refresh public Funding.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update public Funding.
 * @param {Object[]} data data set
 * @param {number} limit query limit
 * @param {number} pageSize page size
 */
export function updatePublicFunding(data, limit, pageSize) {
  return {
    type: types.UPDATE_PUBLIC_FUNDING,
    payload: {
      data,
      limit,
      pageSize,
    },
  }
}

/**
 * Create an action to set current symbol.
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
  fetchPublicFunding,
  fetchNextPublicFunding,
  fetchPrevPublicFunding,
  jumpPage,
  refresh,
  setTargetSymbol,
  updatePublicFunding,
}
