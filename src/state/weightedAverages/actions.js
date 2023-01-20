import types from './constants'

export function fetchWeightedAwerages() {
  return {
    type: types.FETCH_WEIGHTED_AVERAGES,
  }
}

export function fetchFail(payload) {
  return {
    type: types.FETCH_FAIL,
    payload,
  }
}

export function refresh() {
  return {
    type: types.REFRESH,
  }
}

export function updateWeightedAwerages(data) {
  return {
    type: types.UPDATE_WEIGHTED_AVERAGES,
    payload: {
      data,
    },
  }
}

export function setTargetPairs(pairs) {
  return {
    type: types.SET_PAIRS,
    payload: pairs,
  }
}

export function addTargetPair(pair) {
  return {
    type: types.ADD_PAIR,
    payload: pair,
  }
}

export function removeTargetPair(pair) {
  return {
    type: types.REMOVE_PAIR,
    payload: pair,
  }
}

export function clearTargetPairs() {
  return {
    type: types.CLEAR_PAIRS,
  }
}

export default {
  fetchWeightedAwerages,
  clearTargetPairs,
  fetchFail,
  refresh,
  updateWeightedAwerages,
  setTargetPairs,
  addTargetPair,
  removeTargetPair,
}
