export const getUI = state => state.ui

export const getIsExportDialogOpen = state => getUI(state).isExportDialogOpen
export const getIsFrameworkDialogOpen = state => getUI(state).isFrameworkDialogOpen
export const getIsPaginationDialogOpen = state => getUI(state).isPaginationDialogOpen
export const getIsPreferencesDialogOpen = state => getUI(state).isPreferencesDialogOpen
export const getLatestPaginationTimestamp = state => getUI(state).latestPaginationTimestamp
export const getDevice = state => getUI(state).device

export default {
  getIsExportDialogOpen,
  getIsFrameworkDialogOpen,
  getIsPaginationDialogOpen,
  getIsPreferencesDialogOpen,
  getLatestPaginationTimestamp,
  getDevice,
}
