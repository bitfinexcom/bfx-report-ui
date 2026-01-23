import types from './constants'

export function setAutoUpdateToastTemplate(template) {
  return {
    type: types.SET_AUTO_UPDATE_TOAST_TEMPLATE,
    payload: template,
  }
}

export function setAutoUpdateToastProgress(progress) {
  return {
    type: types.SET_ELECTRON_MENU_TEMPLATE,
    payload: progress,
  }
}

export default {
  setAutoUpdateToastTemplate,
  setAutoUpdateToastProgress,
}
