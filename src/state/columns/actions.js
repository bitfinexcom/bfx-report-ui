import types from './constants'

export function setColumnsWidth({ section, columns }) {
  return {
    type: types.SET_COLUMNS_WIDTH,
    payload: { section, columns },
  }
}

export default {
  setColumnsWidth,
}
