import types from './constants'

export function fetchData() {
  return {
    type: types.FETCH,
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

export function updateData(payload) {
  return {
    type: types.UPDATE,
    payload,
  }
}

export default {
  fetchFail,
  fetchData,
  refresh,
  updateData,
}
