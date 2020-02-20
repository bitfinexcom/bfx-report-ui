/* eslint-disable import/prefer-default-export */
import _isEmpty from 'lodash/isEmpty'
import _reduce from 'lodash/reduce'
import _get from 'lodash/get'
import _set from 'lodash/set'
import _toNumber from 'lodash/toNumber'
import _toInteger from 'lodash/toInteger'
import _toString from 'lodash/toString'
import _findKey from 'lodash/findKey'
import _sortBy from 'lodash/sortBy'
import _find from 'lodash/find'

import SECTION_COLUMNS from 'ui/ColumnsFilter/ColumnSelector/ColumnSelector.columns'
import FILTER_TYPES, { FILTER_QUERY_TYPES, FILTERS, FILTER_KEYS } from 'var/filterTypes'
import DATA_TYPES from 'var/dataTypes'

const {
  NUMBER,
  INTEGER,
  STRING,
} = DATA_TYPES

const getValue = ({ dataType, value }) => {
  switch (dataType) {
    case NUMBER:
      return _toNumber(value)
    case INTEGER:
      return _toInteger(value)
    case STRING:
      return _toString(value)
    default:
      return value
  }
}

const getValidFilters = filters => filters.filter((filter) => {
  const { column, type, value } = filter
  return column && type && value !== undefined && value !== ''
})

export const getValidSortedFilters = filters => _sortBy(getValidFilters(filters), ['column', 'type', 'value'])

export const calculateFilterQuery = (filters = []) => {
  if (_isEmpty(filters)) {
    return {}
  }

  const validFilters = getValidFilters(filters)
  return _reduce(validFilters, (acc, filter) => {
    const {
      column, type, dataType, value,
    } = filter

    const filterValue = getValue({ dataType, value })

    switch (type) {
      case FILTERS.CONTAINS:
        _set(acc, `${FILTER_TYPES.LIKE}.${column}`, `%${filterValue}%`)
        break
      case FILTERS.BEGINS_WITH:
        _set(acc, `${FILTER_TYPES.LIKE}.${column}`, `${filterValue}%`)
        break
      case FILTERS.ENDS_WITH:
        _set(acc, `${FILTER_TYPES.LIKE}.${column}`, `%${filterValue}`)
        break
      case FILTERS.EQUAL_TO:
        _set(acc, `${FILTER_TYPES.EQ}.${column}`, filterValue)
        break
      case FILTERS.NOT_EQUAL_TO: {
        const currentFilters = _get(acc, `${FILTER_TYPES.NIN}.${column}`, [])
        _set(acc, `${FILTER_TYPES.NIN}.${column}`, currentFilters.concat(filterValue))
        break
      }
      case FILTERS.GREATER_THAN:
        _set(acc, `${FILTER_TYPES.GT}.${column}`, filterValue)
        break
      case FILTERS.GREATER_THAN_EQUAL:
        _set(acc, `${FILTER_TYPES.GTE}.${column}`, filterValue)
        break
      case FILTERS.LESS_THAN:
        _set(acc, `${FILTER_TYPES.LT}.${column}`, filterValue)
        break
      case FILTERS.LESS_THAN_EQUAL:
        _set(acc, `${FILTER_TYPES.LTE}.${column}`, filterValue)
        break
      default:
    }

    return acc
  }, {})
}

// returns a string with the encoded filters
export const encodeFilters = (filters) => {
  const validFilters = getValidFilters(filters)

  return _sortBy(validFilters, 'column').reduce((acc, filter, index) => {
    const { column, type, value } = filter

    return `${acc}${index ? '&' : ''}${column}=${FILTER_QUERY_TYPES[type]},${encodeURIComponent(value)}`
  }, '')
}

export const decodeFilters = ({ query, section }) => {
  if (!query || !SECTION_COLUMNS[section]) {
    return []
  }

  const params = query.substr(1).split('&')
  const filterParams = params.filter((param) => {
    const [key] = param.split('=')
    return FILTER_KEYS[key]
  })

  return filterParams.map((param) => {
    const [column, val] = param.split('=')
    const [type, value] = val.split(',')

    return {
      column,
      type: _findKey(FILTER_QUERY_TYPES, filterType => filterType === type),
      dataType: _find(SECTION_COLUMNS[section], { id: column }).type,
      value: decodeURIComponent(value),
    }
  })
}
