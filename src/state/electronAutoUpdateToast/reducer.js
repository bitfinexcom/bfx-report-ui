import types from './constants'

const initialState = {
  visible: false,
  toastId: null,
  title: null,
  text: null,
  icon: 'info',
  timer: null,
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonText: 'OK',
  cancelButtonText: 'Cancel',
  progress: null,
}

export function electronAutoUpdateToastReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_AUTO_UPDATE_TOAST_TEMPLATE:
      return {
        ...state,
        ...action.payload,
        visible: true,
        progress: action.payload.progress ?? state.progress,
      }
    case types.SET_AUTO_UPDATE_TOAST_PROGRESS:
      return {
        ...state,
        progress: payload,
      }
    case types.HIDE_AUTO_UPDATE_TOAST:
      return initialState
    default: {
      return state
    }
  }
}

export default electronAutoUpdateToastReducer
