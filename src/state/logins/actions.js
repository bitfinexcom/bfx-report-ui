import types from './constants'

/**
 * Create an action to fetch Logins data.
 * @param {Object} options
 */
export function fetchData(options = {}) {
  return {
    type: types.FETCH,
    payload: options,
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
 * Create an action to set options for Logins data.
 * @param {object} payload object contains options
 */
export function setParams(payload) {
  return {
    type: types.SET_PARAMS,
    payload,
  }
}

/**
 * Create an action to refresh Logins.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Logins.
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
  setParams,
  updateData,
}
