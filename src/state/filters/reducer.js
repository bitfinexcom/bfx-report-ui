import authTypes from 'state/auth/constants'
import { FILTERS_WHITELIST } from 'state/query/utils'
import SECTION_COLUMNS from 'ui/ColumnsFilter/ColumnSelector/ColumnSelector.columns'

import { calculateFilterQuery } from './utils'
import types from './constants'

const getDefaultSectionsValues = defaultValue => FILTERS_WHITELIST.reduce((acc, section) => {
  acc[section] = defaultValue
  return acc
}, {})

const getSectionsColumns = () => FILTERS_WHITELIST.reduce((acc, section) => {
  acc[section] = SECTION_COLUMNS[section].reduce((columns, { id }) => {
    columns[id] = true // eslint-disable-line no-param-reassign
    return columns
  }, {})
  return acc
}, {})

const initialState = {
  ...getDefaultSectionsValues([]),

  // prepared filter queries for each section
  queries: getDefaultSectionsValues({}),
  columns: getSectionsColumns(),
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
          [section]: calculateFilterQuery(filters),
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
