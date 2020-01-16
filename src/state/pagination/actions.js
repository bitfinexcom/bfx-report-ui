import types from './constants'

/**
 * Create an action to fetch next data.
 * @param {string} section
 */
export function fetchNext(section) {
  return {
    type: types.FETCH_NEXT,
    payload: {
      section,
    },
  }
}

/**
 * Create an action to jump to a specific page.
 * @param {string} section
 * @param {number} page
 */
export function jumpPage(section, page) {
  return {
    type: types.JUMP_PAGE,
    payload: {
      section,
      page,
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
 */
export function updatePagination(section, data) {
  return {
    type: types.UPDATE,
    payload: {
      section,
      data,
    },
  }
}

export default {
  fetchNext,
  jumpPage,
  refreshPagination,
  updatePagination,
}
