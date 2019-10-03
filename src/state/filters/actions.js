import types from './constants'

/**
 * Create an action to set section filters.
 * @param {Object} options: section and filters to set
 */

export function setFilters({ section, filters }) {
  return {
    type: types.SET_FILTERS,
    payload: { section, filters },
  }
}

export default {
  setFilters,
}
