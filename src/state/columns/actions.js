import { pickColumnsWidth } from 'utils/columns'

import types from './constants'

export function setColumnsWidth({ section, tableColumns }) {
  const columns = pickColumnsWidth(tableColumns)
  return {
    type: types.SET_COLUMNS_WIDTH,
    payload: { section, columns },
  }
}

export function getColumnsSum(payload) {
  return {
    type: types.GET_COLUMNS_SUM,
    payload,
  }
}

export function setColumnsSum(payload) {
  return {
    type: types.SET_COLUMNS_SUM,
    payload,
  }
}

export function showColumnsSum() {
  return {
    type: types.SHOW_COLUMNS_SUM,
  }
}

export default {
  getColumnsSum,
  setColumnsSum,
  showColumnsSum,
  setColumnsWidth,
}
