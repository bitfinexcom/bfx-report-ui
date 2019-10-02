export const getDerivatives = state => state.derivatives

export const getDataReceived = state => getDerivatives(state).dataReceived
export const getEntries = state => getDerivatives(state).entries
export const getExistingPairs = state => getDerivatives(state).existingPairs
export const getTargetPairs = state => getDerivatives(state).targetPairs

export default {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getDerivatives,
}
