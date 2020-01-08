import _get from 'lodash/get'

import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import { TYPE_WHITELIST, getPageSize } from 'state/query/utils'
import { getPageOffset } from 'state/reducers.helper'

import types from './constants'

const initialSectionState = {
  entriesSize: 0,
  currentEntriesSize: 0,
  nextPage: 0,
  offset: 0,
  pageOffset: 0,
  smallestMts: 0,
}

const getInitialState = () => TYPE_WHITELIST.reduce((acc, section) => {
  acc[section] = initialSectionState
  return acc
}, {})

const initialState = getInitialState()

const SMALLEST_MTS_MAP = {
  [queryTypes.MENU_LEDGERS]: 'mts',
  [queryTypes.MENU_TRADES]: 'mtsCreate',
  [queryTypes.MENU_ORDERS]: 'mtsUpdate',
  [queryTypes.MENU_MOVEMENTS]: 'mtsUpdated',
  [queryTypes.MENU_POSITIONS]: 'mtsUpdate',
  [queryTypes.MENU_POSITIONS_AUDIT]: 'mtsUpdate',
  [queryTypes.MENU_FCREDIT]: 'mtsUpdate',
  [queryTypes.MENU_FLOAN]: 'mtsUpdate',
  [queryTypes.MENU_FOFFER]: 'mtsUpdate',
  [queryTypes.MENU_FPAYMENT]: 'mts',
  [queryTypes.MENU_AFFILIATES_EARNINGS]: 'mts',
  [queryTypes.MENU_PUBLIC_TRADES]: 'mts',
  [queryTypes.MENU_PUBLIC_FUNDING]: 'mts',
  [queryTypes.MENU_TICKERS]: 'mtsUpdate',
}

function paginationReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.UPDATE: {
      if (!_get(payload, ['data', 'res'])) {
        return state
      }
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
      const fetchNextOffsets = (state.entriesSize - queryLimit >= state.offset)
        ? {
          offset: state.offset + state.currentEntriesSize,
          pageOffset: 0,
        } : {}

      return {
        ...state,
        [section]: {
          ...state[section],
          ...fetchNextOffsets,
        },
      }
    }
    case types.JUMP_PAGE: {
      const { section, page, queryLimit } = payload
      const PAGE_SIZE = getPageSize(section)
      const totalOffset = (page - 1) * PAGE_SIZE
      const currentOffset = Math.floor(totalOffset / queryLimit) * queryLimit
      const baseOffset = Math.ceil(page / queryLimit * PAGE_SIZE) * queryLimit

      const nextOffsets = (totalOffset < queryLimit) ? {
        offset: state.offset < baseOffset ? state.offset : baseOffset,
        pageOffset: totalOffset - currentOffset,
      } : {
        offset: currentOffset + queryLimit,
        pageOffset: totalOffset - currentOffset,
      }

      return {
        ...state,
        [section]: {
          ...state[section],
          ...nextOffsets,
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
