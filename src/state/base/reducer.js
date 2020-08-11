import moment from 'moment-timezone'

import { getDefaultTableScrollSetting } from 'state/utils'

import types from './constants'

const initialState = {
  dateFormat: types.DATE_FORMATS[0],
  locale: 'en',
  theme: types.DEFAULT_THEME,
  timezone: types.DEFAULT_TIMEZONE,
  inputTimezone: moment.tz.guess(),
  milliseconds: false,
  tableScroll: getDefaultTableScrollSetting(),
}

export function baseReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_LANG:
      return {
        ...state,
        locale: payload || 'en',
      }
    case types.SET_THEME:
      return {
        ...state,
        theme: payload,
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
    case types.TOGGLE_TABLE_SCROLL:
      return {
        ...state,
        tableScroll: !state.tableScroll,
      }
    default:
      return state
  }
}

export default baseReducer
