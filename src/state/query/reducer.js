import authTypes from 'state/auth/constants'

import types from './constants'

const initialState = {
  exportEmail: '',
  localExportPath: null,
  remoteUrn: null,
  isReportExporting: false,
  isPDFRequired: false,
}

export function queryReducer(state = initialState, action) {
  const { type, payload = {} } = action
  switch (type) {
    case types.SET_EXPORT_EMAIL:
      return {
        ...state,
        exportEmail: payload || '',
      }
    case types.SET_LOCAL_EXPORT_PATH:
      return {
        ...state,
        localExportPath: payload || null,
      }
    case types.SET_REMOTE_REPORT_URN:
      return {
        ...state,
        remoteUrn: payload || null,
      }
    case types.SET_IS_REPORT_EXPORTING:
      return {
        ...state,
        isReportExporting: payload,
      }
    case types.SET_IS_PDF_REQUIRED:
      return {
        ...state,
        isPDFRequired: payload,
      }
    case authTypes.LOGOUT:
      return initialState
    default:
      return state
  }
}

export default queryReducer
