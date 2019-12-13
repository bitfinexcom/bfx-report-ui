import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import { ROUTE_WHITELIST, getPageSize } from 'state/query/utils'
import {
  fetchNext2, fetchPrev2, jumpPage2, getPageOffset,
} from 'state/reducers.helper'

import types from './constants'

const initialSectionState = {
  entriesSize: 0,
  currentEntriesSize: 0,
  nextPage: 0,
  offset: 0,
  pageOffset: 0,
  smallestMts: 0,
}

const getInitialState = () => ROUTE_WHITELIST.reduce((acc, section) => {
  acc[section] = initialSectionState
  return acc
}, {})

const initialState = getInitialState()

const SMALLEST_MTS_MAP = {
  ledgers: 'mts',
  trades: 'mtsCreate',
  orders: 'mtsUpdate',
}

function paginationReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.UPDATE: {
      const { section, data, queryLimit } = payload
      const { res: entries, nextPage } = data
      if (!entries.length) {
        return state
      }

      let smallestMts = 0
      entries.forEach((entry) => {
        const mts = entry[SMALLEST_MTS_MAP[section]]
        if (nextPage === false && (!smallestMts || smallestMts > mts)) {
          smallestMts = mts
        }
      })

      const pageSize = getPageSize(section)
      const [offset, pageOffset] = getPageOffset(state[section], entries, queryLimit, pageSize)

      return {
        ...state,
        [section]: {
          entriesSize: state[section].entriesSize + entries.length,
          currentEntriesSize: entries.length,
          smallestMts: nextPage !== false ? nextPage : smallestMts - 1,
          offset,
          pageOffset,
          nextPage,
        },
      }
    }
    case types.FETCH_NEXT: {
      const { section, queryLimit } = payload
      const fetchNextState = fetchNext2(section, state[section], queryLimit)

      return {
        ...state,
        [section]: {
          ...state[section],
          ...fetchNextState,
        },
      }
    }
    case types.FETCH_PREV: {
      const { section, queryLimit } = payload
      const fetchPrevState = fetchPrev2(section, state[section], queryLimit)

      return {
        ...state,
        [section]: {
          ...state[section],
          ...fetchPrevState,
        },
      }
    }
    case types.JUMP_PAGE: {
      const { section, page, queryLimit } = payload
      const nextState = jumpPage2(section, state, page, queryLimit)

      return {
        ...state,
        [section]: {
          ...state[section],
          ...nextState,
        },
      }
    }
    case types.REFRESH:
      return {
        ...state,
        [payload]: initialSectionState,
      }
    case queryTypes.SET_TIME_RANGE:
    case authTypes.LOGOUT: {
      return initialState
    }
    default: {
      return state
    }
  }
}

export default paginationReducer
