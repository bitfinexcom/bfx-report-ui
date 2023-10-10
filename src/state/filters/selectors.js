import _get from 'lodash/get'
import { isEmpty } from '@bitfinex/lib-js-util-base'

export const getColumns = (state, section) => _get(state, ['filters', 'columns', section])
export const getFilters = (state, section) => _get(state, ['filters', section])
export const getFilterQuery = (state, section) => {
  const filterQuery = _get(state, ['filters', 'queries', section])

  return isEmpty(filterQuery) ? undefined : filterQuery
}

export default {
  getColumns,
  getFilters,
  getFilterQuery,
}
