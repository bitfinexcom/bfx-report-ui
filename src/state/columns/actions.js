import { pickColumnsWidth } from 'utils/columns'

import types from './constants'

export function setColumnsWidth({ section, tableColumns }) {
  const columns = pickColumnsWidth(tableColumns)
  return {
    type: types.SET_COLUMNS_WIDTH,
    payload: { section, columns },
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
