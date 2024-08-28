import { fixedFloat } from 'ui/utils'
import { getCell, getCellState } from 'utils/columns'

export const getColumns = ({
  t,
  data,
  isNoData,
  isLoading,
}) => [
  {
    id: 'currency',
    name: 'column.currency',
    className: 'align-left',
    width: 100,
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { currency } = data[rowIndex]
      return getCell(currency, t)
    },
    copyText: rowIndex => data[rowIndex].currency,
  },
  {
    id: 'balanceUsd',
    name: 'column.balanceUsd',
    width: 150,
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { balanceUsd } = data[rowIndex]
      return getCell(fixedFloat(balanceUsd), t)
    },
    copyText: rowIndex => fixedFloat(data[rowIndex].balanceUsd),
  },
  {
    id: 'percent',
    name: 'column.percent',
    width: 150,
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { percent } = data[rowIndex]
      return getCell(fixedFloat(percent), t)
    },
    copyText: rowIndex => fixedFloat(data[rowIndex].percent),
  },
]
