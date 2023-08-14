export const getQuery = state => state.query

export const getRemoteUrn = state => getQuery(state).remoteUrn
export const getExportEmail = state => getQuery(state).exportEmail
export const getLocalExportPath = state => getQuery(state).localExportPath
export const getIsCsvExporting = state => getQuery(state)?.isCsvExporting ?? false

export default {
  getQuery,
  getRemoteUrn,
  getExportEmail,
  getIsCsvExporting,
  getLocalExportPath,
}
