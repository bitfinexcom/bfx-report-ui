export const getQuery = state => state.query

export const getExportEmail = state => getQuery(state).exportEmail
export const getLocalExportPath = state => getQuery(state).localExportPath

export default {
  getQuery,
  getExportEmail,
  getLocalExportPath,
}
