import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'

import types from './constants'

const initialState = {
  entries: [],
  dataReceived: false,
  smallestMts: 0,
  offset: 0, // end of current offset
  pageOffset: 0, // start of current page
  pageLoading: false,
}

const LIMIT = queryTypes.DEFAULT_FLOAN_QUERY_LIMIT
const PAGE_SIZE = queryTypes.DEFAULT_FLOAN_PAGE_SIZE

export function fundingLoanHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_FLOAN: {
      const result = action.payload
      let smallestMts
      const entries = result.map((entry) => {
        const {
          amount,
          flags,
          hidden,
          id,
          mtsCreate,
          mtsLastPayout,
          mtsOpening,
          mtsUpdate,
          noClose,
          notify,
          period,
          rate,
          rateReal,
          renew,
          side,
          status,
          symbol,
        } = entry
        // log smallest mts
        if (!smallestMts || smallestMts > mtsUpdate) {
          smallestMts = mtsUpdate
        }
        return {
          id,
          symbol: symbol.slice(1),
          side,
          mtsCreate,
          mtsUpdate,
          amount,
          flags,
          status,
          rate,
          period,
          mtsOpening,
          mtsLastPayout,
          notify,
          hidden,
          renew,
          rateReal,
          noClose,
        }
      })
      return {
        ...state,
        entries: [...state.entries, ...entries],
        dataReceived: true,
        smallestMts,
        offset: state.offset + entries.length,
        pageOffset: 0,
        pageLoading: false,
      }
    }
    case types.FETCH_FAIL:
      return {
        ...state,
        pageLoading: false,
      }
    case types.FETCH_NEXT_FLOAN:
      return (state.entries.length - LIMIT > state.offset)
        ? {
          ...state,
          offset: state.offset + LIMIT,
          pageOffset: 0,
        } : {
          ...state,
          pageLoading: true,
        }
    case types.FETCH_PREV_FLOAN:
      return {
        ...state,
        offset: state.offset >= LIMIT ? state.offset - LIMIT : 0,
        pageOffset: 0,
      }
    case types.JUMP_FLOAN_PAGE: {
      const page = action.payload
      const totalOffset = (page - 1) * PAGE_SIZE
      const currentOffset = Math.floor(totalOffset / LIMIT) * LIMIT
      if (totalOffset < LIMIT) {
        const baseOffset = Math.ceil(page / LIMIT * PAGE_SIZE) * LIMIT
        return {
          ...state,
          offset: state.offset < baseOffset ? state.offset : baseOffset,
          pageOffset: totalOffset - currentOffset,
        }
      }
      return {
        ...state,
        offset: currentOffset + LIMIT,
        pageOffset: totalOffset - currentOffset,
      }
    }
    case queryTypes.SET_TIME_RANGE:
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default fundingLoanHistoryReducer
