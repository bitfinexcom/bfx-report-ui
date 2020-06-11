import types from './constants'

/**
 * Create an action to fetch Change Logs data.
 */
export function fetchData() {
  return {
    type: types.FETCH,
  }
}

/**
 * Create an action to note fetch fail.
 * @param {Object} payload fail message
 */
export function fetchFail(payload) {
  return {
    type: types.FETCH_FAIL,
    payload,
  }
}

/**
 * Create an action to refresh Change Logs.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Change Logs.
 * @param {Object[]} data
 */
export function updateData(data) {
  return {
    type: types.UPDATE,
    payload: {
      data,
    },
  }
}

export default {
  fetchData,
  fetchFail,
  refresh,
  updateData,
}
