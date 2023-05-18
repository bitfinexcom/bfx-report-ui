import _filter from 'lodash/filter'
import _isEmpty from 'lodash/isEmpty'

export const getFilledAccounts = (accounts) => accounts
  .filter((account) => {
    const {
      email,
      password,
      isNotProtected,
      apiKey,
      apiSecret,
    } = account

    return (apiKey && apiSecret) || (email && (isNotProtected || password))
  })

export const EMPTY_ACCOUNT = {
  email: '',
  password: '',
  isNotProtected: true,
  apiKey: '',
  apiSecret: '',
}

export const MAX_ACCOUNTS = 15

export const filterRestrictedUsers = (users) => _filter(
  users, user => !user?.isRestrictedToBeAddedToSubAccount
  && _isEmpty(user?.subUsers),
)

export const USE_API_KEY = 'subaccounts.use_api_key'

export default {
  getFilledAccounts,
  filterRestrictedUsers,
  EMPTY_ACCOUNT,
  MAX_ACCOUNTS,
  USE_API_KEY,
}
