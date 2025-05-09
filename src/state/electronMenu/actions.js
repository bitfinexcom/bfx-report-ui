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

export function setElectronMenuTemplate(template) {
  return {
    type: types.SET_ELECTRON_MENU_TEMPLATE,
    payload: template,
  }
}

export function setElectronMenuHidden(state) {
  return {
    type: types.SET_ELECTRON_MENU_HIDDEN,
    payload: state,
  }
}

export function executeMenuCommand(id) {
  return {
    type: types.EXEC_MENU_COMMAND,
    payload: id,
  }
}

export default {
  executeMenuCommand,
  setElectronMenuTitle,
  getElectronMenuConfig,
  setElectronMenuHidden,
  setElectronMenuTemplate,
}
