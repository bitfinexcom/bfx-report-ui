export const getSubAccountsData = state => state.subAccounts

export const subUsers = state => getSubAccountsData(state).subUsers

export default {
  subUsers,
}
