import _isNull from 'lodash/isNull'
import _isEmpty from 'lodash/isEmpty'
import _toString from 'lodash/toString'

export const getUserType = ({ isApiKeysAuth, subUsers }) => {
  if (!isApiKeysAuth) return 'auth.login'
  if (isApiKeysAuth && !_isEmpty(subUsers)) return 'auth.multyAccsApi'
  return 'auth.apiKey'
}

export const getMenuOptionTitle = ({ isApiKeysAuth, subUsers }) => {
  if (isApiKeysAuth && !_isEmpty(subUsers)) return 'auth.manageMultipleAccs'
  return 'auth.addAccountsToThisAcc'
}

export const getUserTitle = ({
  isApiKeysAuth, subUsers, email, localUsername,
}) => {
  if (isApiKeysAuth && !_isEmpty(subUsers) && !_isNull(localUsername)) {
    return _toString(localUsername)
  }
  return _toString(email)
}

export default {
  getUserType,
  getUserTitle,
  getMenuOptionTitle,
}
