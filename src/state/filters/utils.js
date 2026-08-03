/* eslint-disable import/prefer-default-export */
import _set from 'lodash/set'
import _find from 'lodash/find'
import _omit from 'lodash/omit'
import _uniq from 'lodash/uniq'
import _isNaN from 'lodash/isNaN'
import _reduce from 'lodash/reduce'
import _sortBy from 'lodash/sortBy'
import _filter from 'lodash/filter'
import _countBy from 'lodash/countBy'
import _findKey from 'lodash/findKey'
import _toString from 'lodash/toString'
import _toNumber from 'lodash/toNumber'
import _toInteger from 'lodash/toInteger'
import { get, isEmpty } from '@bitfinex/lib-js-util-base'

import SECTION_COLUMNS, { TRANSFORMS } from 'ui/ColumnsFilter/ColumnSelector/ColumnSelector.columns'
import FILTER_TYPES, { FILTER_QUERY_TYPES, FILTERS, FILTER_KEYS } from 'var/filterTypes'
import queryConstants from 'state/query/constants'
import DATA_TYPES from 'var/dataTypes'

const {
  MENU_LEDGERS,
  MENU_FPAYMENT,
  MENU_SPAYMENTS,
  MENU_AFFILIATES_EARNINGS,
} = queryConstants

const {
  NUMBER,
  INTEGER,
  STRING,
  DATE,
} = DATA_TYPES

const getValue = ({ dataType, value }) => {
  switch (dataType) {
    case NUMBER:
    case DATE:
      return _toNumber(value)
    case INTEGER: {
      const number = _toNumber(value)
      return _isNaN(number) ? NaN : _toInteger(number)
    }
    case STRING:
      return _toString(value)
    default:
      return value
  }
}

const transformFilter = ({ type, value }) => {
  switch (type) {
    case TRANSFORMS.PERCENTAGE:
      return (value / 100).toFixed(8)
    default:
      return value
  }
}

const getValidFilters = filters => filters.filter((filter) => {
  const { column, type, value } = filter
  return column && type && value !== undefined && value !== ''
})

export const getValidSortedFilters = filters => _sortBy(getValidFilters(filters), ['column', 'type', 'value'])

export const calculateFilterQuery = (filters = [], section) => {
  if (isEmpty(filters) || !section) {
    return {}
  }

  const validFilters = getValidFilters(filters)
  const columns = SECTION_COLUMNS[section]
  const equalCountsByColumn = _countBy(
    _filter(validFilters, { type: FILTERS.EQUAL_TO }), 'column',
  )
  const notEqualCountsByColumn = _countBy(
    _filter(validFilters, { type: FILTERS.NOT_EQUAL_TO }), 'column',
  )

  return _reduce(validFilters, (acc, filter) => {
    const {
      column, type, dataType, value,
    } = filter

    let filterValue = getValue({ dataType, value })
    if ((dataType === NUMBER || dataType === INTEGER) && _isNaN(filterValue)) {
      return acc
    }

    const { transform } = columns.find(col => col.id === column)
    if (transform) {
      filterValue = transformFilter({ type: transform, value: filterValue })
    }

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
      case FILTERS.EQUAL_TO: {
        // a single value maps to $eq, multiple ones are collected into a $in list
        if (get(equalCountsByColumn, column, 0) > 1) {
          const currentValues = get(acc, `${FILTER_TYPES.IN}.${column}`, [])
          _set(acc, `${FILTER_TYPES.IN}.${column}`, _uniq(currentValues.concat(filterValue)))
        } else {
          _set(acc, `${FILTER_TYPES.EQ}.${column}`, filterValue)
        }
        break
      }
      case FILTERS.NOT_EQUAL_TO: {
        // a single exclusion maps to $ne, multiple ones are collected into a $nin list
        if (get(notEqualCountsByColumn, column, 0) > 1) {
          const currentValues = get(acc, `${FILTER_TYPES.NIN}.${column}`, [])
          _set(acc, `${FILTER_TYPES.NIN}.${column}`, _uniq(currentValues.concat(filterValue)))
        } else {
          _set(acc, `${FILTER_TYPES.NE}.${column}`, filterValue)
        }
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

// sections backed by the getLedgers/getLedgersFile methods, which accept a dedicated wallet param
export const WALLET_PARAM_SECTIONS = [
  MENU_LEDGERS,
  MENU_FPAYMENT,
  MENU_SPAYMENTS,
  MENU_AFFILIATES_EARNINGS,
]

// the backend resolves the dedicated `wallet` param faster than a generic $eq filter
export const splitWalletFilter = (filterQuery) => {
  const wallet = get(filterQuery, [FILTER_TYPES.EQ, 'wallet'])
  if (isEmpty(wallet)) {
    return { filter: filterQuery, wallet: undefined }
  }

  const restEqFilters = _omit(get(filterQuery, FILTER_TYPES.EQ), 'wallet')
  const filter = isEmpty(restEqFilters)
    ? _omit(filterQuery, FILTER_TYPES.EQ)
    : { ...filterQuery, [FILTER_TYPES.EQ]: restEqFilters }

  return { wallet, filter: isEmpty(filter) ? undefined : filter }
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
    const filterData = _find(SECTION_COLUMNS[section], { id: column })
    const { type: dataType, select } = filterData

    return {
      column,
      type: _findKey(FILTER_QUERY_TYPES, filterType => filterType === type),
      dataType,
      select,
      value: getValue({ dataType, value: decodeURIComponent(value) }),
    }
  })
}
