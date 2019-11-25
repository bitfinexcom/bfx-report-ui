import types from './constants'

/**
 * Create an action to set section columns.
 * @param {Object} options: section and columns to set for display
 */

export function setColumns({ section, columns }) {
  return {
    type: types.SET_COLUMNS,
    payload: { section, columns },
  }
}

/**
 * Create an action to set section filters.
 * @param {Object} options: section and filters to set
 */

export function setFilters({ section, filters, refresh }) {
  return {
    type: types.SET_FILTERS,
    payload: { section, filters, refresh },
  }
}

export default {
  setColumns,
  setFilters,
}
