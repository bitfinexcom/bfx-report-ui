import queryTypes from 'state/query/constants'
import { getFilterType, getQueryLimit, getPageSize } from 'state/query/utils'

/* init states */
export const paginateState = {
  offset: 0, // end of current offset
  pageOffset: 0, // start of current page, is used by jumpPage
}

export const baseState = {
  ...paginateState,
  dataReceived: false,
  entries: [],
  currentEntriesSize: 0,
  pageLoading: false,
  smallestMts: 0,
  nextPage: false,
}

export const basePairState = {
  ...baseState,
  existingPairs: [],
  targetPairs: [],
}

export const baseSymbolState = {
  ...baseState,
  existingCoins: [],
  targetSymbols: [],
}

export function fetchFail(state) {
  return {
    ...state,
    pageLoading: false,
  }
}

// existingCoins/existingPairs should be re-calc in new time range
export function setTimeRange(type, state, initialState) {
  return getFilterType(type) === queryTypes.FILTER_SYMBOL
    ? {
      ...initialState,
      targetSymbol: state.targetSymbol,
    }
    : {
      ...initialState,
      targetPair: state.targetPair,
    }
}

/* pagination */
export function fetchNext(type, state) {
  const LIMIT = getQueryLimit(type)
  return (state.entries.length - LIMIT >= state.offset)
    ? {
      ...state,
      offset: state.offset + state.currentEntriesSize,
      pageOffset: 0,
    } : {
      ...state,
      pageLoading: true,
    }
}

export function fetchPrev(type, state) {
  const LIMIT = getQueryLimit(type)
  return {
    ...state,
    offset: state.offset >= LIMIT ? state.offset - LIMIT : 0,
    pageOffset: 0,
  }
}

export function jumpPage(type, state, page) {
  const LIMIT = getQueryLimit(type)
  const PAGE_SIZE = getPageSize(type)
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

/* symbols */
export function addSymbol(state, payload, initialState) {
  return state.targetSymbols.includes(payload)
    ? state
    : {
      ...initialState,
      targetSymbols: [...state.targetSymbols, payload],
      existingCoins: state.existingCoins,
    }
}

export function removeSymbol(state, payload, initialState) {
  return (state.targetSymbols.includes(payload))
    ? {
      ...initialState,
      targetSymbols: state.targetSymbols.filter(symbol => symbol !== payload),
      existingCoins: state.existingCoins,
    }
    : state
}

export function setSymbols(state, payload, initialState) {
  return {
    ...initialState,
    targetSymbols: payload,
    existingCoins: state.existingCoins,
  }
}

/* pairs */
export function addPair(state, payload, initialState) {
  return state.targetPairs.includes(payload)
    ? state
    : {
      ...initialState,
      targetPairs: [...state.targetPairs, payload],
      existingPairs: state.existingPairs,
    }
}

export function removePair(state, payload, initialState) {
  return (state.targetPairs.includes(payload))
    ? {
      ...initialState,
      targetPairs: state.targetPairs.filter(pair => pair !== payload),
      existingPairs: state.existingPairs,
    }
    : state
}

export function setPairs(state, payload, initialState) {
  return {
    ...initialState,
    targetPairs: payload,
    existingPairs: state.existingPairs,
  }
}

export default {
  addPair,
  addSymbol,
  basePairState,
  baseSymbolState,
  fetchFail,
  fetchNext,
  fetchPrev,
  jumpPage,
  paginateState,
  removePair,
  removeSymbol,
  setPairs,
  setSymbols,
  setTimeRange,
}
