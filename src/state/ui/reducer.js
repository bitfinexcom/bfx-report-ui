import types from './constants'

const initialState = {
  isCustomDialogOpen: false,
}

export function uiReducer(state = initialState, action) {
  const { type, payload = {} } = action
  switch (type) {
    case types.SHOW_CUSTOM_DIALOG:
      return {
        ...state,
        isCustomDialogOpen: payload,
      }
    default: {
      return state
    }
  }
}

export default uiReducer
