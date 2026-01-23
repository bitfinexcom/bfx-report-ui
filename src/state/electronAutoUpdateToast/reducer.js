import types from './constants'

const initialState = {
  toastTemplate: {},
  autoUpdateProgress: null,
}

export function electronAutoUpdateToast(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_AUTO_UPDATE_TOAST_TEMPLATE:
      return {
        ...state,
        toastTemplate: payload,
      }
    case types.SET_AUTO_UPDATE_TOAST_PROGRESS:
      return {
        ...state,
        autoUpdateProgress: payload,
      }
    default: {
      return state
    }
  }
}

export default electronAutoUpdateToast
