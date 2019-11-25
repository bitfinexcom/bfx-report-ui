import _get from 'lodash/get'

export const getColumns = (state, section) => _get(state, ['filters', 'columns', section])
export const getFilters = (state, section) => _get(state, ['filters', section])
export const getFilterQuery = (state, section) => _get(state, ['filters', 'queries', section])

export default {
  getColumns,
  getFilters,
  getFilterQuery,
}
