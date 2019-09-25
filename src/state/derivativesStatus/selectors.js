export const getDerivativesStatus = state => state.derivativesStatus

export const getDataReceived = state => getDerivativesStatus(state).dataReceived
export const getEntries = state => getDerivativesStatus(state).entries
export const getExistingPairs = state => getDerivativesStatus(state).existingPairs
export const getTargetPairs = state => getDerivativesStatus(state).targetPairs

export default {
  getDataReceived,
  getEntries,
  getExistingPairs,
  getDerivativesStatus,
}
