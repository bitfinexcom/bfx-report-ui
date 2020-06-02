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

const getSectionsColumns = () => FILTERS_WHITELIST.reduce((acc, section) => {
  acc[section] = SECTION_COLUMNS[section].reduce((columns, { id, hidden }) => {
    columns[id] = !hidden // eslint-disable-line no-param-reassign
    return columns
  }, {})
  return acc
}, {})

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
      return {
        ...state,
        columns: {
          ...state.columns,
          [section]: columns,
        },
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
