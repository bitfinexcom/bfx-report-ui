import types from './constants'

/**
 * Create an action to export report.
 * @param {string[]} targets array of export types
 */
export function exportReport(targets) {
  return {
    type: types.EXPORT_REPORT,
    payload: targets,
  }
}

/**
 * Create an action to set path to local export folder.
 * @param {string} path to local export folder
 */
export function setLocalExportPath(path) {
  return {
    type: types.SET_LOCAL_EXPORT_PATH,
    payload: path,
  }
}

/**
 * Create an action to set remote report URN.
 * @param {string} urn to generated report.
 */
export function setRemoteUrn(urn) {
  return {
    type: types.SET_REMOTE_REPORT_URN,
    payload: urn,
  }
}

/**
 * Create an action to prepare export related params.
 */
export function prepareExport() {
  return {
    type: types.PREPARE_EXPORT,
  }
}

/**
 * Create an action to set sender email.
 * @param {boolean | string} email return false or the email address
 */
export function setExportEmail(email) {
  return {
    type: types.SET_EXPORT_EMAIL,
    payload: email,
  }
}

export function setIsCsvExporting(isExporting) {
  return {
    type: types.SET_IS_REPORT_EXPORTING,
    payload: isExporting,
  }
}

export function setIsPdfRequired(isPdfRequired) {
  return {
    type: types.SET_IS_PDF_REQUIRED,
    payload: isPdfRequired,
  }
}

export default {
  exportReport,
  setRemoteUrn,
  prepareExport,
  setExportEmail,
  setIsPdfRequired,
  setIsCsvExporting,
  setLocalExportPath,
}
