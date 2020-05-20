export const getQuery = state => state.query

export const getEmail = state => getQuery(state).email
export const getExportEmail = state => getQuery(state).exportEmail

export default {
  getEmail,
  getExportEmail,
  getQuery,
}
