import types from './constants'

/**
 * Create an action to fetch Account Summary data.
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
 * Create an action to refresh Account Summary.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Account Summary.
 * @param {Object[]} payload data set
 */
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
