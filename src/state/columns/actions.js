import types from './constants'
import { prepareColumns } from './utils'

export function setColumnsWidth({ section, tableColumns }) {
  const columns = prepareColumns(tableColumns)
  return {
    type: types.SET_COLUMNS_WIDTH,
    payload: { section, columns },
  }
}

export default {
  setColumnsWidth,
}
