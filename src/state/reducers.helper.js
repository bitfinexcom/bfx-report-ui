import queryTypes from 'state/query/constants'
import { getFilterType } from 'state/query/utils'

export const baseState = {
  dataReceived: false,
  entries: [],
  pageLoading: false,
}

export const basePairState = {
  ...baseState,
  existingPairs: [], // shown in selection when a full list of pairs is unavailable
  targetPairs: [],
}

export const baseSymbolState = {
  ...baseState,
  existingCoins: [], // shown in selection when a full list of symbols is unavailable
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

export function refresh(type, state, initialState) {
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
  refresh,
  removePair,
  removeSymbol,
  setPairs,
  setSymbols,
  setTimeRange,
}
