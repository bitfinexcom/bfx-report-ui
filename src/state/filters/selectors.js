import { get, isEmpty } from '@bitfinex/lib-js-util-base'

export const getColumns = (state, section) => get(state, ['filters', 'columns', section])
export const getFilters = (state, section) => get(state, ['filters', section])
export const getFilterQuery = (state, section) => {
  const filterQuery = get(state, ['filters', 'queries', section])

  return isEmpty(filterQuery) ? undefined : filterQuery
}

export default {
  getColumns,
  getFilters,
  getFilterQuery,
}
