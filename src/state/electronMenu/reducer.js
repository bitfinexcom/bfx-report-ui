import types from './constants'

const initialState = {
  menuTitle: '',
  menuTemplate: [],
  menuHidden: true,
}

export function electronMenuReducer(state = initialState, action) {
  const { type, payload = {} } = action
  switch (type) {
    case types.SET_ELECTRON_MENU_TITLE:
      return {
        ...state,
        menuTitle: payload,
      }
    case types.SET_ELECTRON_MENU_TEMPLATE:
      return {
        ...state,
        menuTemplate: payload,
      }
    case types.SET_ELECTRON_MENU_HIDDEN:
      return {
        ...state,
        menuHidden: payload,
      }
    default: {
      return state
    }
  }
}

export default electronMenuReducer
