import _get from 'lodash/get'
import _size from 'lodash/size'
import _filter from 'lodash/filter'
import _reduce from 'lodash/reduce'
import _toString from 'lodash/toString'
import _includes from 'lodash/includes'
import { isEmpty, isEqual } from '@bitfinex/lib-js-util-base'

import { FILTERS } from 'var/filterTypes'

// filter types whose repeated use on the same column is collected into a list ($in/$nin)
// instead of overwriting the previous value, so duplicates are allowed for them
const LIST_FILTER_TYPES = [FILTERS.EQUAL_TO, FILTERS.NOT_EQUAL_TO]

const getActiveFilters = (filters) => _filter(
  filters, filter => !isEmpty(_toString(filter?.value ?? '')),
)

// filter types already applied to the same column, as re-using one overwrites the previous filter;
// list types (equal to / not equal to) are exempt, since their values are collected into a $in/$nin list
export const getUsedFilterTypes = (filters, index) => {
  const { column } = _get(filters, index, {})
  if (isEmpty(column)) {
    return []
  }

  return _reduce(filters, (acc, filter, i) => {
    const { column: filterColumn, type } = filter

    if (!isEqual(i, index)
      && isEqual(filterColumn, column)
      && !isEmpty(type)
      && !_includes(LIST_FILTER_TYPES, type)) {
      acc.push(type)
    }

    return acc
  }, [])
}

// values already used for the same column, as reusing one produces a contradictory query
// (e.g. wallet `equal to` exchange combined with wallet `not equal to` exchange)
export const getUsedFilterValues = (filters, index) => {
  const { column } = _get(filters, index, {})
  if (isEmpty(column)) {
    return []
  }

  return _reduce(filters, (acc, filter, i) => {
    const { column: filterColumn, value } = filter

    if (!isEqual(i, index)
      && isEqual(filterColumn, column)
      && !isEmpty(_toString(value))) {
      acc.push(value)
    }

    return acc
  }, [])
}

export const getFiltersClassNames = (filters) => {
  const activeFilters = getActiveFilters(filters)
  return _size(activeFilters) > 0 ? '' : 'no-filters'
}

export const getFiltersTitle = (filters, t) => {
  if (_size(filters) > 0) {
    const activeFilters = getActiveFilters(filters)
    const filtersTitle = _size(activeFilters) > 1
      ? t('columnsfilter.filters.title')
      : t('columnsfilter.title')

    return _size(activeFilters) > 0
      ? `${_size(activeFilters)} ${filtersTitle}`
      : t('columnsfilter.none')
  }

  return t('columnsfilter.none')
}

export default {
  getFiltersTitle,
  getUsedFilterTypes,
  getUsedFilterValues,
  getFiltersClassNames,
}
