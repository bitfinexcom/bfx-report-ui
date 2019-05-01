import types from './constants'

const initialState = {
  isCustomDialogOpen: false,
  isFrameworkDialogOpen: false,
}

export function uiReducer(state = initialState, action) {
  const { type, payload = {} } = action
  switch (type) {
    case types.SHOW_CUSTOM_DIALOG:
      return {
        ...state,
        isCustomDialogOpen: payload,
      }
    case types.TOGGLE_FRAMEWORK_DIALOG:
      return {
        ...state,
        isFrameworkDialogOpen: !state.isFrameworkDialogOpen,
      }
    default: {
      return state
    }
  }
}

export default uiReducer
