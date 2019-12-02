export const getUI = state => state.ui

export const getIsCustomDialogOpen = state => getUI(state).isCustomDialogOpen
export const getIsFrameworkDialogOpen = state => getUI(state).isFrameworkDialogOpen
export const getDevice = state => getUI(state).device

export default {
  getIsCustomDialogOpen,
  getIsFrameworkDialogOpen,
  getDevice,
}
