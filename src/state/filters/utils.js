/* eslint-disable import/prefer-default-export */
import _isEmpty from 'lodash/isEmpty'
import _reduce from 'lodash/reduce'
import _set from 'lodash/set'

import FILTER_TYPES, { FILTERS } from 'var/filterTypes'

export const calculateFilterQuery = (filters = []) => {
  if (_isEmpty(filters)) {
    return {}
  }

  const validFilters = filters.filter((filter) => {
    const { column, type, value } = filter
    return column && type && value !== undefined && value !== ''
  })

  return _reduce(validFilters, (acc, filter) => {
    const { column, type, value } = filter

    switch (type) {
      case FILTERS.CONTAINS:
        _set(acc, `${FILTER_TYPES.LIKE}.${column}`, `%${value}%`)
        break
      case FILTERS.BEGINS_WITH:
        _set(acc, `${FILTER_TYPES.LIKE}.${column}`, `${value}%`)
        break
      case FILTERS.ENDS_WITH:
        _set(acc, `${FILTER_TYPES.LIKE}.${column}`, `%${value}`)
        break
      case FILTERS.EQUAL_TO:
        _set(acc, `${FILTER_TYPES.EQ}.${column}`, +value)
        break
      case FILTERS.NOT_EQUAL_TO:
        _set(acc, `${FILTER_TYPES.NE}.${column}`, +value)
        break
      case FILTERS.GREATER_THAN:
        _set(acc, `${FILTER_TYPES.GTE}.${column}`, +value)
        break
      case FILTERS.LESS_THAN:
        _set(acc, `${FILTER_TYPES.LTE}.${column}`, +value)
        break
      default:
    }

    return acc
  }, {})
}
