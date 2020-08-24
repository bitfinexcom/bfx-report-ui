import types from './constants'

/**
 * Create an action to add sub accounts.
 * @param {array} subAccounts contains objects with 'apiKey' and 'apiSecret'
 */
export function addSubAccounts(subAccounts) {
  return {
    type: types.ADD,
    payload: subAccounts,
  }
}

/**
 * Create an action to fetch sub accounts.
 * @param {object} auth contains auth data for sub account
 */
export function fetchSubAccounts(auth) {
  return {
    type: types.FETCH,
    payload: auth,
  }
}

/**
 * Create an action to remove a sub account.
 * @param {object} subAccount contains account to remove
 */
export function removeSubAccount(subAccount) {
  return {
    type: types.REMOVE,
    payload: subAccount,
  }
}

/**
 * Create an action to set sub accounts data.
 * @param {object} payload contains account data
 */
export function setSubAccounts(payload) {
  return {
    type: types.SET,
    payload,
  }
}

export default {
  addSubAccounts,
  fetchSubAccounts,
  removeSubAccount,
  setSubAccounts,
}
