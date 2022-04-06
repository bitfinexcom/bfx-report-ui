export const getQuery = state => state.query

export const getRemoteUrn = state => getQuery(state).remoteUrn
export const getExportEmail = state => getQuery(state).exportEmail
export const getLocalExportPath = state => getQuery(state).localExportPath

export default {
  getQuery,
  getRemoteUrn,
  getExportEmail,
  getLocalExportPath,
}
