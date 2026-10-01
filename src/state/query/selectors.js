export const getQuery = state => state.query

export const getRemoteUrn = state => getQuery(state).remoteUrn
export const getExportEmail = state => getQuery(state).exportEmail
export const getLocalExportPath = state => getQuery(state).localExportPath
export const getIsReportExporting = state => getQuery(state)?.isReportExporting ?? false
export const getIsPdfExportRequired = state => getQuery(state)?.isPDFRequired ?? false
export const getIsSingleExport = state => getQuery(state)?.isSingleExport ?? true
export const getFirstExportPath = state => getQuery(state)?.firstExportPath ?? null
export const getReportFolderWritePerm = state => getQuery(state)?.reportFolderWritePerm ?? null

export default {
  getQuery,
  getRemoteUrn,
  getExportEmail,
  getIsReportExporting,
  getLocalExportPath,
  getIsPdfExportRequired,
  getIsSingleExport,
  getFirstExportPath,
  getReportFolderWritePerm,
}
