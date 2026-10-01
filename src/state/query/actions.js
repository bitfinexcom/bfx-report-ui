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

export function setIsReportExporting(isExporting) {
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

export function openExportFolder() {
  return {
    type: types.OPEN_EXPORT_FOLDER,
  }
}

export function setIsSingleExport(isSingleExport) {
  return {
    type: types.SET_IS_SINGLE_EXPORT,
    payload: isSingleExport,
  }
}

export function setFirstExportPath(path) {
  return {
    type: types.SET_FIRST_EXPORT_PATH,
    payload: path,
  }
}

/**
 * Create an action to set report folder write permission check result.
 * @param {Object} permCheck check result from the electron api
 */
export function setReportFolderWritePerm(permCheck = {}) {
  return {
    type: types.SET_REPORT_FOLDER_WRITE_PERM,
    payload: permCheck,
  }
}

export default {
  exportReport,
  setRemoteUrn,
  prepareExport,
  setExportEmail,
  setIsPdfRequired,
  setIsReportExporting,
  setLocalExportPath,
  openExportFolder,
  setIsSingleExport,
  setFirstExportPath,
  setReportFolderWritePerm,
}
