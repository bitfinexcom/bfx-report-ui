import types from './constants'

const initialState = {
  visible: false,
}

export function electronAutoUpdateToastReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_AUTO_UPDATE_TOAST_TEMPLATE:
      return {
        ...state,
        ...action.payload,
        visible: true,
      }
    case types.SET_AUTO_UPDATE_TOAST_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      }
    case types.HIDE_AUTO_UPDATE_TOAST:
      return initialState
    default: {
      return state
    }
  }
}

export default electronAutoUpdateToastReducer
