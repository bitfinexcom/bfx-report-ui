import getDeviceType from 'utils/getDeviceType'

import types from './constants'

const initialState = {
  isElectronBackendLoaded: false,
  isExportDialogOpen: false,
  isErrorDialogOpen: false,
  isExportSuccessDialogOpen: false,
  isFrameworkDialogOpen: false,
  isPaginationDialogOpen: false,
  isPreferencesDialogOpen: false,
  isTimeFrameDialogOpen: false,
  latestPaginationTimestamp: undefined,
  errorMessage: null,
  device: getDeviceType(),
  windowWidth: window.innerWidth,
}

export function uiReducer(state = initialState, action) {
  const { type, payload = {} } = action
  switch (type) {
    case types.ELECTRON_BACKEND_LOADED:
      return {
        ...state,
        isElectronBackendLoaded: true,
      }
    case types.TOGGLE_ERROR_DIALOG: {
      const { isErrorDialogOpen, errorMessage } = payload

      return {
        ...state,
        isErrorDialogOpen,
        errorMessage,
      }
    }
    case types.TOGGLE_EXPORT_DIALOG:
      return {
        ...state,
        isExportDialogOpen: !state.isExportDialogOpen,
      }
    case types.TOGGLE_EXPORT_SUCCESS_DIALOG:
      return {
        ...state,
        isExportSuccessDialogOpen: !state.isExportSuccessDialogOpen,
      }
    case types.TOGGLE_FRAMEWORK_DIALOG:
      return {
        ...state,
        isFrameworkDialogOpen: !state.isFrameworkDialogOpen,
      }
    case types.TOGGLE_PAGINATION_DIALOG: {
      const { isOpen, latestPaginationTimestamp } = payload

      return {
        ...state,
        isPaginationDialogOpen: isOpen,
        latestPaginationTimestamp,
      }
    }
    case types.TOGGLE_PREFERENCES_DIALOG: {
      return {
        ...state,
        isPreferencesDialogOpen: !state.isPreferencesDialogOpen,
      }
    }
    case types.TOGGLE_TIMEFRAME_DIALOG: {
      return {
        ...state,
        isTimeFrameDialogOpen: !state.isTimeFrameDialogOpen,
      }
    }
    case types.UI_RESIZED:
      return {
        ...state,
        device: getDeviceType(),
        windowWidth: window.innerWidth,
      }
    default: {
      return state
    }
  }
}

export default uiReducer
