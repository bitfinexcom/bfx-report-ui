export const getElectronMenu = state => state.electronMenu

export const getElectronMenuTitle = state => getElectronMenu(state)?.menuTitle ?? ''
export const getElectronMenuTemplate = state => getElectronMenu(state)?.menuTemplate ?? []
export const getIsElectronMenuHidden = state => getElectronMenu(state)?.menuHidden ?? true

export default {
  getElectronMenuTitle,
  getIsElectronMenuHidden,
  getElectronMenuTemplate,
}
