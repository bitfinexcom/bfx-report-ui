export const getMovements = state => state.movements

export const getExistingCoins = state => getMovements(state).existingCoins
export const getTargetSymbols = state => getMovements(state).targetSymbols
export const getDataReceived = state => getMovements(state).dataReceived
export const getEntries = state => getMovements(state).entries
export const getPageLoading = state => getMovements(state).pageLoading
export const getMovementInfo = state => getMovements(state)?.movementInfo ?? {}

export default {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getMovements,
  getPageLoading,
  getTargetSymbols,
  getMovementInfo,
}
