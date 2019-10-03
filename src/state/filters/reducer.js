import authTypes from 'state/auth/constants'
import { FILTERS_WHITELIST } from 'state/query/utils'

import { calculateFilterQuery } from './utils'
import types from './constants'

const getDefaultSectionsValues = defaultValue => FILTERS_WHITELIST.reduce((acc, section) => {
  acc[section] = defaultValue
  return acc
}, {})

const initialState = {
  ...getDefaultSectionsValues([]),

  // prepared filter queries for each section
  queries: getDefaultSectionsValues({}),
}

function filtersReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
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
