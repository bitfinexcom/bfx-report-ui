/* eslint-disable import/prefer-default-export */
import _isEmpty from 'lodash/isEmpty'
import _reduce from 'lodash/reduce'
import _includes from 'lodash/includes'

import { ARRAY_FILTERS } from 'var/filterTypes'

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

    const isArrayTypeFilter = _includes(ARRAY_FILTERS, type)

    if (!acc[type]) {
      acc[type] = isArrayTypeFilter
        ? []
        : {}
    }

    if (isArrayTypeFilter) {
      acc[type].push(column)
    } else {
      acc[type][column] = value
    }

    return acc
  }, {})
}
