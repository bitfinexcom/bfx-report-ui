import { get, isEmpty } from '@bitfinex/lib-js-util-base'

import { splitWalletFilter } from './utils'

export const getColumns = (state, section) => get(state, ['filters', 'columns', section])
export const getFilters = (state, section) => get(state, ['filters', section])
export const getFilterQuery = (state, section) => {
  const filterQuery = get(state, ['filters', 'queries', section])

  return isEmpty(filterQuery) ? undefined : filterQuery
}

// for the getLedgers based sections, the wallet condition is passed as a standalone param
export const getLedgersFilterQuery = (state, section) => splitWalletFilter(getFilterQuery(state, section))

export default {
  getColumns,
  getFilters,
  getFilterQuery,
  getLedgersFilterQuery,
}
