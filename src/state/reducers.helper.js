import queryTypes from 'state/query/constants'
import { getFilterType, getPageSize } from 'state/query/utils'

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
  switch (getFilterType(type)) {
    case queryTypes.FILTER_SYMBOL:
      return {
        ...initialState,
        targetSymbols: state.targetSymbols,
      }
    case queryTypes.FILTER_ID:
      return {
        ...initialState,
        targetIds: state.targetIds,
      }
    case queryTypes.FILTER_PAIR:
    default:
      return {
        ...initialState,
        targetPairs: state.targetPairs,
      }
  }
}

/* pagination */
export function getPageOffset(state, entries, limit, pageSize) {
  // show current page instead of the next page
  return (state.offset % limit !== 0)
    ? [
      (Math.floor(state.offset / limit) + 1) * limit,
      limit - pageSize, // current last page
    ]
    : [
      state.offset + entries.length,
      0,
    ]
}

export function fetchNext(type, state, limit) {
  return (state.entries.length - limit >= state.offset)
    ? {
      ...state,
      offset: state.offset + state.currentEntriesSize,
      pageOffset: 0,
    } : {
      ...state,
      pageLoading: true,
    }
}

export function fetchPrev(type, state, limit) {
  return {
    ...state,
    offset: state.offset >= limit ? state.offset - limit : 0,
    pageOffset: 0,
  }
}

export function jumpPage(type, state, payload) {
  const { page, queryLimit } = payload
  const pageSize = getPageSize(type)
  const totalOffset = (page - 1) * pageSize
  const currentOffset = Math.floor(totalOffset / queryLimit) * queryLimit
  if (totalOffset < queryLimit) {
    const baseOffset = Math.ceil(page / queryLimit * pageSize) * queryLimit
    return {
      ...state,
      offset: state.offset < baseOffset ? state.offset : baseOffset,
      pageOffset: totalOffset - currentOffset,
    }
  }
  return {
    ...state,
    offset: currentOffset + queryLimit,
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

export function setQueryLimit(type, state, initialState) {
  const data = (getFilterType(type) === queryTypes.FILTER_PAIR)
    ? { targetPairs: state.targetPairs }
    : { targetSymbols: state.targetSymbols }
  return {
    ...initialState,
    ...data,
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
  getPageOffset,
  jumpPage,
  paginateState,
  removePair,
  removeSymbol,
  setPairs,
  setSymbols,
  setTimeRange,
}
