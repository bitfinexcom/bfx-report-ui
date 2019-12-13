import _get from 'lodash/get'

import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import { FILTERS_WHITELIST, getPageSize } from 'state/query/utils'
import ledgersTypes from 'state/ledgers/constants'
import types from './constants'
import { fetchNext2, fetchPrev2, jumpPage2, getPageOffset } from 'state/reducers.helper'

const initialSectionState = {
  entriesSize: 0,
  currentEntriesSize: 0,
  nextPage: 0,
  offset: 0,
  pageOffset: 0,
  smallestMts: 0,
}

const getInitialState = () => FILTERS_WHITELIST.reduce((acc, section) => {
  acc[section] = initialSectionState
  return acc
}, {})

const initialState = getInitialState()

function paginationReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ledgersTypes.UPDATE_LEDGERS: {
      if (!_get(payload, ['data', 'res'])) {
        return state
      }

      const { data, limit } = payload
      const { res, nextPage } = data
      const pageSize = getPageSize('ledgers')
      let smallestMts
      res.forEach((entry) => {
        const {
          mts,
        } = entry
        if (nextPage === false && (!smallestMts || smallestMts > mts)) {
          smallestMts = mts
        }
      })
      const [offset, pageOffset] = getPageOffset(state.ledgers, res, limit, pageSize)

      return {
        ...state,
        ledgers: {
          entriesSize: state.ledgers.entriesSize + res.length,
          currentEntriesSize: res.length,
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
