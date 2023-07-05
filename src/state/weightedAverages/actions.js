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

export function setTargetPair(pair) {
  return {
    type: types.SET_PAIR,
    payload: pair,
  }
}

export default {
  fetchWeightedAwerages,
  fetchFail,
  refresh,
  updateWeightedAwerages,
  setTargetPair,
}
