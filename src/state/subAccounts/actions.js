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
 * Create an action to remove a sub account.
 * @param {object} subAccount contains account to remove
 */
export function removeSubAccount(subAccount) {
  return {
    type: types.REMOVE,
    payload: subAccount,
  }
}

export default {
  addSubAccounts,
  removeSubAccount,
}
