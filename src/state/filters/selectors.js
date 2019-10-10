import _get from 'lodash/get'

export const getFilters = (state, section) => _get(state, ['filters', section])
export const getFilterQuery = (state, section) => _get(state, ['filters', 'queries', section])

export default {
  getFilters,
  getFilterQuery,
}
