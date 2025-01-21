import types from './constants'

export function getElectronMenuConfig() {
  return {
    type: types.GET_ELECTRON_MENU_CONFIG,
  }
}

export function setElectronMenuTitle(title) {
  return {
    type: types.SET_ELECTRON_MENU_TITLE,
    payload: title,
  }
}

export function settElectronMenuTemplate(template) {
  return {
    type: types.SET_ELECTRON_MENU_TEMPLATE,
    payload: template,
  }
}

export function settElectronMenuHidden(state) {
  return {
    type: types.SET_ELECTRON_MENU_HIDDEN,
    payload: state,
  }
}

export default {
  setElectronMenuTitle,
  getElectronMenuConfig,
  settElectronMenuHidden,
  settElectronMenuTemplate,
}
