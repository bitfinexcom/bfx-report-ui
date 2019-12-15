import types from './constants'

/**
 * Create an action to fetch Positions Audit data.
 * @param {Object} options
 */
export function fetchPAudit(options = {}) {
  return {
    type: types.FETCH_PAUDIT,
    payload: options,
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
 * Create an action to refresh Positions Audit.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update Positions Audit.
 * @param {Object[]} data data set
 * @param {number} limit query limit
 * @param {number} pageSize page size
 */
export function updatePAudit(data, limit, pageSize) {
  return {
    type: types.UPDATE_PAUDIT,
    payload: {
      data,
      limit,
      pageSize,
    },
  }
}

/**
 * Create an action to set current id.
 * @param {string[]} ids ids
 */
export function setTargetIds(ids) {
  return {
    type: types.SET_IDS,
    payload: ids,
  }
}

/**
 * Create an action to add target id.
 * @param {string} id id
 */
export function addTargetId(id) {
  return {
    type: types.ADD_ID,
    payload: id,
  }
}

/**
 * Create an action to remove target id.
 * @param {string} id id
 */
export function removeTargetId(id) {
  return {
    type: types.REMOVE_ID,
    payload: id,
  }
}

export default {
  addTargetId,
  fetchFail,
  fetchPAudit,
  refresh,
  removeTargetId,
  setTargetIds,
  updatePAudit,
}
