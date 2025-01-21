import types from './constants'

export function getElectronMenuConfig() {
  return {
    type: types.GET_ELECTRON_MENU_CONFIG,
  }
}

export default {
  getElectronMenuConfig,
}
