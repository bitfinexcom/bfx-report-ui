import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'

import types from './constants'

const initialState = {
  dataReceived: false,
  entries: [],
  existingCoins: [],
  offset: 0, // end of current offset
  pageOffset: 0, // start of current page
  pageLoading: false,
  smallestMts: 0,
  targetSymbol: '',
}

const LIMIT = queryTypes.DEFAULT_FCREDIT_QUERY_LIMIT
const PAGE_SIZE = queryTypes.DEFAULT_FCREDIT_PAGE_SIZE

export function fundingCreditHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_FCREDIT: {
      const result = action.payload
      const { existingCoins } = state
      const updateCoins = [...existingCoins]
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
          positionPair,
          rate,
          rateReal,
          renew,
          side,
          status,
          symbol,
        } = entry
        const currentSymbol = symbol.slice(1)
        // save new symbol to updateCoins list
        if (updateCoins.indexOf(currentSymbol) === -1) {
          updateCoins.push(currentSymbol)
        }
        // log smallest mts
        if (!smallestMts || smallestMts > mtsUpdate) {
          smallestMts = mtsUpdate
        }
        return {
          id,
          symbol: currentSymbol,
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
          rateReal,
          renew,
          noClose,
          positionPair,
        }
      })
      return {
        ...state,
        entries: [...state.entries, ...entries],
        existingCoins: updateCoins.sort(),
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
    case types.FETCH_NEXT_FCREDIT:
      return (state.entries.length - LIMIT > state.offset)
        ? {
          ...state,
          offset: state.offset + LIMIT,
          pageOffset: 0,
        } : {
          ...state,
          pageLoading: true,
        }
    case types.FETCH_PREV_FCREDIT:
      return {
        ...state,
        offset: state.offset >= LIMIT ? state.offset - LIMIT : 0,
        pageOffset: 0,
      }
    case types.JUMP_FCREDIT_PAGE: {
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
    case types.SET_SYMBOL:
      return {
        ...initialState,
        targetSymbol: action.payload,
        existingCoins: state.existingCoins,
      }
    // existingCoins should be re-calc in new time range
    case types.REFRESH:
    case queryTypes.SET_TIME_RANGE:
      return {
        ...initialState,
        targetSymbol: state.targetSymbol,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default fundingCreditHistoryReducer
