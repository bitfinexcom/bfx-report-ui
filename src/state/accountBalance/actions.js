import types from './constants'

/**
 * Create an action to fetch Account Balance data.
 * @param {object} payload object contains options for fetching Account Balance
 */
export function fetchBalance(payload) {
  return {
    type: types.FETCH_BALANCE,
    payload,
  }
}

/**
 * Create an action to set options for Account Balance data.
 * @param {object} payload object contains options
 */
export function setParams(payload) {
  return {
    type: types.SET_PARAMS,
    payload,
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
 * Create an action to refresh Account Balance.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Account Balance.
 * @param {Object[]} payload data set
 */
export function updateBalance(payload) {
  return {
    type: types.UPDATE_BALANCE,
    payload,
  }
}

export default {
  fetchFail,
  fetchBalance,
  refresh,
  setParams,
  updateBalance,
}
