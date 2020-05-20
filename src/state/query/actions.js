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
 * Create an action to prepare export related params.
 */
export function prepareExport() {
  return {
    type: types.PREPARE_EXPORT,
  }
}

/**
 * Create an action to set owner email.
 * @param {boolean | string} email return false or the email address
 */
export function setOwnerEmail(email) {
  return {
    type: types.SET_OWNER_EMAIL,
    payload: email,
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
  setOwnerEmail,
}
