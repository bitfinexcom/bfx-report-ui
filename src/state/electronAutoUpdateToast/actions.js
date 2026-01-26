import types from './constants'

export function setAutoUpdateToastTemplate(template) {
  return {
    type: types.SET_AUTO_UPDATE_TOAST_TEMPLATE,
    payload: template,
  }
}

export function setAutoUpdateToastProgress(progress) {
  return {
    type: types.SET_AUTO_UPDATE_TOAST_PROGRESS,
    payload: progress,
  }
}

export function hideAutoUpdateToast(dismiss) {
  return {
    type: types.HIDE_AUTO_UPDATE_TOAST,
    payload: dismiss,
  }
}

export default {
  setAutoUpdateToastTemplate,
  setAutoUpdateToastProgress,
}
