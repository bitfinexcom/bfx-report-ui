import moment from 'moment-timezone'
import authTypes from 'state/auth/constants'

import types from './constants'

// auth states are local cached
const initialState = {
  apiKey: '',
  apiSecret: '',
  authToken: '',
  isSyncEnabled: true,
  dateFormat: types.DATE_FORMATS[0],
  locale: 'en',
  menuMode: types.MENU_MODE_NORMAL,
  queryLimit: 0,
  theme: types.DEFAULT_THEME,
  timezone: types.DEFAULT_TIMEZONE,
  inputTimezone: moment.tz.guess(),
  milliseconds: false,
}

export function baseReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_API_KEY:
      return {
        ...state,
        apiKey: payload,
      }
    case types.SET_API_SECRET:
      return {
        ...state,
        apiSecret: payload,
      }
    case types.SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: payload,
      }
    case types.SET_SYNC_STATE:
      return {
        ...state,
        isSyncEnabled: payload,
      }
    case types.SET_LANG:
      return {
        ...state,
        locale: payload,
      }
    case types.SET_THEME:
      return {
        ...state,
        theme: payload,
      }
    case types.SET_MENU_MODE:
      return {
        ...state,
        menuMode: payload,
      }
    case authTypes.LOGOUT:
      return {
        ...state,
        authToken: '',
      }
    case types.SET_TIMEZONE:
      return {
        ...state,
        timezone: payload,
      }
    case types.SET_DISPLAY_TIMEZONE:
      return {
        ...state,
        inputTimezone: payload,
      }
    case types.SET_DATE_FORMAT:
      return {
        ...state,
        dateFormat: payload,
      }
    case types.SHOW_MILLISECONDS:
      return {
        ...state,
        milliseconds: payload,
      }
    case types.SET_QUERY_LIMIT:
      return {
        ...state,
        queryLimit: payload,
      }
    default:
      return state
  }
}

export default baseReducer
