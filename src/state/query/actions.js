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
export function setLocalCsvPath(path) {
  return {
    type: types.SET_LOCAL_CSV_PATH,
    payload: path,
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
  prepareExport,
  setExportEmail,
  setLocalCsvPath,
}
