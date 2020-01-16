import types from './constants'

/**
 * Create an action to fetch Snapshots data.
 * @param {string} timestamp param from url
 */
export function fetchSnapshots(timestamp) {
  return {
    type: types.FETCH_SNAPSHOTS,
    payload: timestamp,
  }
}

/**
 * Create an action to set timestamp.
 * @param {number} timestamp
 */
export function setTimestamp(timestamp) {
  return {
    type: types.SET_TIMESTAMP,
    payload: timestamp,
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
 * Create an action to refresh Snapshots.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Snapshots.
 * @param {Object} payload data set
 */
export function updateSnapshots(payload) {
  return {
    type: types.UPDATE_SNAPSHOTS,
    payload,
  }
}

export default {
  fetchFail,
  fetchSnapshots,
  refresh,
  setTimestamp,
  updateSnapshots,
}
