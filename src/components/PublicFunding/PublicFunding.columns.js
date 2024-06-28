import { fixedFloat, formatAmount } from 'ui/utils'
import { getCell, getCellState, getColumnWidth } from 'utils/columns'

export const getColumns = ({
  t,
  isNoData,
  isLoading,
  timeOffset,
  getFullTime,
  filteredData,
  targetSymbol,
  columnsWidth,
}) => [
  {
    id: 'id',
    name: 'column.id',
    className: 'align-left',
    width: getColumnWidth('id', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { id } = filteredData[rowIndex]
      return getCell(id, t)
    },
    copyText: rowIndex => filteredData[rowIndex].id,
  },
  {
    id: 'mts',
    className: 'align-left',
    nameStr: `${t('column.time')} (${timeOffset})`,
    width: getColumnWidth('mts', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const timestamp = getFullTime(filteredData[rowIndex].mts)
      return getCell(timestamp, t)
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mts),
  },
  {
    id: 'amount',
    name: 'column.amount',
    width: getColumnWidth('amount', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { amount } = filteredData[rowIndex]
      return getCell(formatAmount(amount), t, fixedFloat(amount))
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].amount),
  },
  {
    id: 'rate',
    name: 'column.rateperc',
    width: getColumnWidth('rate', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { rate } = filteredData[rowIndex]
      return getCell(formatAmount(rate, { color: 'red' }), t, fixedFloat(rate))
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].rate),
  },
  {
    id: 'period',
    name: 'column.period',
    className: 'align-left',
    width: getColumnWidth('period', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const period = `${filteredData[rowIndex].period} ${t('column.days')}`
      return getCell(period, t)
    },
    copyText: (rowIndex) => {
      const days = t('column.days')
      return `${filteredData[rowIndex].period} ${days}`
    },
  },
  {
    id: 'currency',
    name: 'column.currency',
    className: 'align-left',
    width: getColumnWidth('currency', columnsWidth),
    renderer: () => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      return getCell(targetSymbol, t)
    },
    copyText: () => targetSymbol,
  },
]
