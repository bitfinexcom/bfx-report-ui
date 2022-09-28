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

export default {
  getFilledAccounts,
  EMPTY_ACCOUNT,
  MAX_ACCOUNTS,
}
