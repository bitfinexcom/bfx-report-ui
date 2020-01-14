import getDeviceType from 'utils/getDeviceType'

import types from './constants'

const initialState = {
  isCustomDialogOpen: false,
  isExportDialogOpen: false,
  isFrameworkDialogOpen: false,
  isPaginationDialogOpen: false,
  latestPaginationTimestamp: undefined,
  device: getDeviceType(),
}

export function uiReducer(state = initialState, action) {
  const { type, payload = {} } = action
  switch (type) {
    case types.SHOW_CUSTOM_DIALOG:
      return {
        ...state,
        isCustomDialogOpen: payload,
      }
    case types.TOGGLE_EXPORT_DIALOG:
      return {
        ...state,
        isExportDialogOpen: !state.isExportDialogOpen,
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
    case types.UI_RESIZED:
      return {
        ...state,
        device: getDeviceType(),
      }
    default: {
      return state
    }
  }
}

export default uiReducer
