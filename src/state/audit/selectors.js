export const getPositionsAudit = state => state.audit

export const getDataReceived = state => getPositionsAudit(state).dataReceived
export const getEntries = state => getPositionsAudit(state).entries
export const getPageLoading = state => getPositionsAudit(state).pageLoading
export const getTargetIds = state => getPositionsAudit(state).targetIds

export default {
  getDataReceived,
  getEntries,
  getPageLoading,
  getPositionsAudit,
  getTargetIds,
}
