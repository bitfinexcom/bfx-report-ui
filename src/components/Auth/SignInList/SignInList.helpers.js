import _isEmpty from 'lodash/isEmpty'

export const getUserType = ({ isApiKeysAuth, subUsers }) => {
  if (!isApiKeysAuth) return 'auth.login'
  if (isApiKeysAuth && !_isEmpty(subUsers)) return 'auth.multyAccsApi'
  return 'auth.apiKey'
}

export const getMenuOptionTitle = ({ isApiKeysAuth, subUsers }) => {
  if (isApiKeysAuth && !_isEmpty(subUsers)) return 'auth.manageMultipleAccs'
  return 'auth.addAccountsToThisAcc'
}

export default {
  getUserType,
  getMenuOptionTitle,
}
