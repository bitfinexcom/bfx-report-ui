import types from './constants'

/**
 * Create an action to add sub accounts.
 * @param {array} subUsers contains objects with 'apiKey' and 'apiSecret'
 */
export function addSubAccount(subUsers) {
  return {
    type: types.ADD,
    payload: subUsers,
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
 * Create an action to update a sub account.
 * @param {object} data contains sub users to add and remove
 */
export function updateSubAccount(data) {
  return {
    type: types.UPDATE,
    payload: data,
  }
}

export default {
  addSubAccount,
  removeSubAccount,
  updateSubAccount,
}
