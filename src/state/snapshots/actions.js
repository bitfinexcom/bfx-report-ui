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
 * Create an action to generate Snapshots from scratch.
 * @param {number} timestamp end time, current moment if omitted
 */
export function generateSnapshots(timestamp) {
  return {
    type: types.GENERATE_SNAPSHOTS,
    payload: timestamp,
  }
}

/**
 * Create an action to cancel Snapshots generation.
 */
export function cancelSnapshotsGeneration() {
  return {
    type: types.CANCEL_SNAPSHOTS_GENERATION,
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
  cancelSnapshotsGeneration,
  fetchFail,
  fetchSnapshots,
  generateSnapshots,
  setTimestamp,
  updateSnapshots,
}
