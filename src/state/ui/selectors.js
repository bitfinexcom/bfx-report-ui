export const getUI = state => state.ui

export const getIsCustomDialogOpen = state => getUI(state).isCustomDialogOpen

export const getIsFrameworkDialogOpen = state => getUI(state).isFrameworkDialogOpen

export default {
  getIsCustomDialogOpen,
  getIsFrameworkDialogOpen,
}
