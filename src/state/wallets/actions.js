import types from './constants'

/**
 * Create an action to fetch Wallets data.
 * @param {string} timestamp timestamp param from url
 */
export function fetchWallets(timestamp) {
  return {
    type: types.FETCH_WALLETS,
    payload: timestamp,
  }
}

export function setTimestamp(timestamp) {
  return {
    type: types.SET_TIMESTAMP,
    payload: timestamp
  }
}

/**
 * Create an action to note fetch fail.
 * @param {number} payload fail message
 */
export function fetchFail(payload) {
  return {
    type: types.FETCH_FAIL,
    payload,
  }
}

/**
 * Create an action to refresh Wallets.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Wallets.
 * @param {Object[]} payload data set
 */
export function updateWallets(payload) {
  return {
    type: types.UPDATE_WALLETS,
    payload,
  }
}

export default {
  fetchFail,
  fetchWallets,
  refresh,
  setTimestamp,
  updateWallets,
}
