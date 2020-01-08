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
 * Create an action to jump to a specific page.
 * @param {string} section
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
 * @param {string} section
 */
export function refreshPagination(section) {
  return {
    type: types.REFRESH,
    payload: section,
  }
}

/**
 * Create an action to update section data.
 * @param {string} section
 * @param {Object} data
 * @param {number} queryLimit
 */
export function updatePagination(section, data, queryLimit) {
  return {
    type: types.UPDATE,
    payload: {
      section,
      data,
      queryLimit,
    },
  }
}

export default {
  fetchNext,
  jumpPage,
  refreshPagination,
  updatePagination,
}
