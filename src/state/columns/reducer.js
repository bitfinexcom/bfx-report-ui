import types from './constants'

const updateColumnsWidth = (columns) => {
  localStorage.setItem('columnsWidth', JSON.stringify(columns))
}

const getSectionsColumnsWidth = () => JSON.parse(localStorage.getItem('columnsWidth') || '{}')

const initialState = {
  ...getSectionsColumnsWidth(),
}

function columnsReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_COLUMNS_WIDTH: {
      const { section, columns } = payload

      const nextColumns = {
        ...state,
        [section]: columns,
      }
      updateColumnsWidth(nextColumns)

      return {
        ...state,
        ...nextColumns,
      }
    }
    default: {
      return state
    }
  }
}

export default columnsReducer
