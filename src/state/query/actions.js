import types from './constants'

/**
 * Create an action to export CSV.
 * @param {string[]} targets array of export types
 */
export function exportCsv(targets) {
  return {
    type: types.EXPORT_CSV,
    payload: targets,
  }
}

/**
 * Create an action to set path to local export CSV folder.
 * @param {string} path to local export folder
 */
export function setLocalExportPath(path) {
  return {
    type: types.SET_LOCAL_EXPORT_PATH,
    payload: path,
  }
}

/**
 * Create an action to set remote CSV URN.
 * @param {string} urn to generated report.
 */
export function setRemoteUrn(urn) {
  return {
    type: types.SET_REMOTE_CSV_URN,
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

export default {
  exportCsv,
  setRemoteUrn,
  prepareExport,
  setExportEmail,
  setLocalExportPath,
}
