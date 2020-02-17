import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'

export const getColumns = (state, section) => _get(state, ['filters', 'columns', section])
export const getFilters = (state, section) => _get(state, ['filters', section])
export const getFilterQuery = (state, section) => {
  const filterQuery = _get(state, ['filters', 'queries', section])

  return _isEmpty(filterQuery) ? undefined : filterQuery
}

export default {
  getColumns,
  getFilters,
  getFilterQuery,
}
