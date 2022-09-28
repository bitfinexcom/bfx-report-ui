import _get from 'lodash/get'
import _defaultTo from 'lodash/defaultTo'

import authTypes from 'state/auth/constants'
import { FILTERS_WHITELIST } from 'state/query/utils'
import DEFAULT_FILTERS from 'ui/ColumnsFilter/var/defaultFilters'
import SECTION_COLUMNS from 'ui/ColumnsFilter/ColumnSelector/ColumnSelector.columns'

import { calculateFilterQuery } from './utils'
import types from './constants'

const getDefaultFilters = () => FILTERS_WHITELIST.reduce((acc, section) => {
  acc[section] = DEFAULT_FILTERS[section]
  return acc
}, {})

const getDefaultQueries = () => FILTERS_WHITELIST.reduce((acc, section) => {
  acc[section] = {}
  return acc
}, {})

const updateColumnsVisibility = (columns) => {
  localStorage.setItem('columnsVisibility', JSON.stringify(columns))
}

const getSectionsColumns = () => {
  const storedData = JSON.parse(localStorage.getItem('columnsVisibility') || '{}')

  const sectionsColumns = FILTERS_WHITELIST.reduce((acc, section) => {
    acc[section] = SECTION_COLUMNS[section].reduce((columns, { id, hidden }) => {
      const storedParam = _get(storedData, [section, id])
      columns[id] = _defaultTo(storedParam, !hidden) // eslint-disable-line no-param-reassign
      return columns
    }, {})
    return acc
  }, {})
  updateColumnsVisibility(sectionsColumns)

  return sectionsColumns
}

const initialState = {
  ...getDefaultFilters(),

  queries: getDefaultQueries(), // prepared filter queries for each section
  columns: getSectionsColumns(), // columns that are currently displayed for each section
}

function filtersReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_COLUMNS: {
      const { section, columns } = payload
      const nextColumns = {
        ...state.columns,
        [section]: columns,
      }
      updateColumnsVisibility(nextColumns)

      return {
        ...state,
        columns: nextColumns,
      }
    }
    case types.SET_FILTERS: {
      const { section, filters } = payload
      return {
        ...state,
        [section]: filters,
        queries: {
          ...state.queries,
          [section]: calculateFilterQuery(filters, section),
        },
      }
    }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default filtersReducer
