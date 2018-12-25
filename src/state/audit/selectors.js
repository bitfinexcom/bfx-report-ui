export const getPositionsAudit = state => state.audit

export const getDataReceived = state => getPositionsAudit(state).dataReceived
export const getEntries = state => getPositionsAudit(state).entries
export const getOffset = state => getPositionsAudit(state).offset
export const getPageLoading = state => getPositionsAudit(state).pageLoading
export const getPageOffset = state => getPositionsAudit(state).pageOffset
export const getTargetIds = state => getPositionsAudit(state).targetIds
export const getNextPage = state => getPositionsAudit(state).nextPage

export default {
  getDataReceived,
  getEntries,
  getNextPage,
  getOffset,
  getPageLoading,
  getPageOffset,
  getPositionsAudit,
  getTargetIds,
}
