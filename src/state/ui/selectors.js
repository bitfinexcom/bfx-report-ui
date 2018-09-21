export const getUI = state => state.ui

export const getIsCustomDialogOpen = state => getUI(state).isCustomDialogOpen

export default {
  getIsCustomDialogOpen,
}
