import types from './constants'

/**
 * Create an action to fetch next data.
 * @param {string} section
 * @param {number} queryLimit
 */
export function fetchNext(section, queryLimit) {
  return {
    type: types.FETCH_NEXT,
    payload: {
      section,
      queryLimit,
    },
  }
}

/**
 * Create an action to fetch prev data.
 * @param {number} section
 * @param {number} queryLimit
 */
export function fetchPrev(section, queryLimit) {
  return {
    type: types.FETCH_PREV,
    payload: {
      section,
      queryLimit,
    },
  }
}

/**
 * Create an action to jump to a specific page.
 * @param {number} section
 * @param {number} page page number
 * @param {number} queryLimit
 */
export function jumpPage(section, page, queryLimit) {
  return {
    type: types.JUMP_PAGE,
    payload: {
      section,
      page,
      queryLimit,
    },
  }
}

/**
 * Create an action to refresh section data.
 */
export function refreshPagination(section) {
  return {
    type: types.REFRESH,
    payload: section,
  }
}

export default {
  fetchNext,
  fetchPrev,
  jumpPage,
  refreshPagination,
}
