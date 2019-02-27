export const getWithdrawals = state => state.withdrawals

export const getExistingCoins = state => getWithdrawals(state).existingCoins
export const getTargetSymbols = state => getWithdrawals(state).targetSymbols
export const getDataReceived = state => getWithdrawals(state).dataReceived
export const getEntries = state => getWithdrawals(state).entries
export const getOffset = state => getWithdrawals(state).offset
export const getPageLoading = state => getWithdrawals(state).pageLoading
export const getPageOffset = state => getWithdrawals(state).pageOffset
export const getNextPage = state => getWithdrawals(state).nextPage

export default {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getNextPage,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetSymbols,
  getWithdrawals,
}
