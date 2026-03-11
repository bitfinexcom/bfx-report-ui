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

export function closeAutoUpdateToast(dismiss) {
  return {
    type: types.CLOSE_AUTO_UPDATE_TOAST,
    payload: dismiss,
  }
}

export function hideAutoUpdateToast() {
  return {
    type: types.HIDE_AUTO_UPDATE_TOAST,
  }
}

export default {
  setAutoUpdateToastTemplate,
  setAutoUpdateToastProgress,
  closeAutoUpdateToast,
}
