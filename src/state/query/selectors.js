export const getQuery = state => state.query

export const getExportEmail = state => getQuery(state).exportEmail

export default {
  getExportEmail,
  getQuery,
}
