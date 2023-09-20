export const getUI = state => state.ui

export const getIsElectronBackendLoaded = state => getUI(state).isElectronBackendLoaded
export const getIsErrorDialogOpen = state => getUI(state).isErrorDialogOpen
export const getIsErrorDialogDisabled = state => getUI(state).isErrorDialogDisabled
export const getIsExportDialogOpen = state => getUI(state).isExportDialogOpen
export const getIsExportSuccessDialogOpen = state => getUI(state).isExportSuccessDialogOpen
export const getIsPaginationDialogOpen = state => getUI(state).isPaginationDialogOpen
export const getIsPreferencesDialogOpen = state => getUI(state).isPreferencesDialogOpen
export const getIsTimeFrameDialogOpen = state => getUI(state).isTimeFrameDialogOpen
export const getIsGoToRangeDialogOpen = state => getUI(state).isGoToRangeDialogOpen
export const getIsNavigationDrawerOpen = state => getUI(state).isNavigationDrawerOpen
export const getLatestPaginationTimestamp = state => getUI(state).latestPaginationTimestamp
export const getErrorDialogMessage = state => getUI(state).errorMessage
export const getDevice = state => getUI(state).device
export const getWindowWidth = state => getUI(state).windowWidth
export const getIsExtraInfoDialogOpen = state => getUI(state)?.isExtraInfoDialogOpen ?? false

export default {
  getIsElectronBackendLoaded,
  getIsErrorDialogDisabled,
  getIsErrorDialogOpen,
  getIsExportDialogOpen,
  getIsExportSuccessDialogOpen,
  getIsPaginationDialogOpen,
  getIsPreferencesDialogOpen,
  getIsTimeFrameDialogOpen,
  getIsGoToRangeDialogOpen,
  getIsNavigationDrawerOpen,
  getLatestPaginationTimestamp,
  getErrorDialogMessage,
  getDevice,
  getWindowWidth,
  getIsExtraInfoDialogOpen,
}
