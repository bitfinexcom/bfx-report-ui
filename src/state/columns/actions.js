import { pickColumnsWidth } from 'utils/columns'

import types from './constants'

export function setColumnsWidth({ section, columns }) {
  const preparedColumns = pickColumnsWidth(columns)
  return {
    type: types.SET_COLUMNS_WIDTH,
    payload: { section, preparedColumns },
  }
}

export function showColumnsSum(payload) {
  return {
    type: types.SHOW_COLUMNS_SUM,
    payload,
  }
}

export default {
  showColumnsSum,
  setColumnsWidth,
}
