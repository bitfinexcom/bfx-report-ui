import _get from 'lodash/get'

import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'
import { getPageSize, TYPE_WHITELIST } from 'state/query/utils'

import types from './constants'

const initialSectionState = {
  entriesSize: 0,
  nextPage: 0,
  smallestMts: 0,

  page: 1,
}

const getInitialState = () => TYPE_WHITELIST.reduce((acc, section) => {
  acc[section] = initialSectionState
  return acc
}, {})

export const initialState = getInitialState()

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
      const { section, data } = payload
      const { res: entries, nextPage } = data
      if (!entries.length) {
        return state
      }

      let smallestMts = 0
      entries.forEach((entry) => {
        const mts = entry[SMALLEST_MTS_MAP[section]] || 0
        if (nextPage === false && (!smallestMts || mts < smallestMts)) {
          smallestMts = mts
        }
      })

      const currentPage = state[section].page
      const entriesSize = state[section].entriesSize + entries.length
      const pageSize = getPageSize(section)
      const maxPage = Math.ceil(entriesSize / pageSize)

      return {
        ...state,
        [section]: {
          entriesSize,
          smallestMts: nextPage !== false ? nextPage : smallestMts - 1,
          nextPage,

          // jump next page if not first fetch and able
          page: entries.length < entriesSize && maxPage > currentPage
            ? currentPage + 1
            : currentPage,
        },
      }
    }
    case types.JUMP_PAGE: {
      const { section, page } = payload

      return {
        ...state,
        [section]: {
          ...state[section],
          page,
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
