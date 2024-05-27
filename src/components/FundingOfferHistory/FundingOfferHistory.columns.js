import { formatAmount, fixedFloat } from 'ui/utils'
import { getCell, getCellState, getColumnWidth } from 'utils/columns'

export const getColumns = ({
  t,
  isNoData,
  isLoading,
  timeOffset,
  getFullTime,
  filteredData,
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
    id: 'symbol',
    name: 'column.currency',
    className: 'align-left',
    width: getColumnWidth('symbol', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { symbol } = filteredData[rowIndex]
      return getCell(symbol, t)
    },
    copyText: rowIndex => filteredData[rowIndex].symbol,
  },
  {
    id: 'amountOrig',
    name: 'column.amount',
    width: getColumnWidth('amountOrig', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { amountOrig } = filteredData[rowIndex]
      return getCell(formatAmount(amountOrig), t, fixedFloat(amountOrig))
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].amountOrig),
  },
  {
    id: 'amountExecuted',
    name: 'column.amount-exe',
    width: getColumnWidth('amountExecuted', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { amountExecuted } = filteredData[rowIndex]
      return getCell(formatAmount(amountExecuted), t, fixedFloat(amountExecuted))
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].amountExecuted),
  },
  {
    id: 'type',
    name: 'column.type',
    className: 'align-left',
    width: getColumnWidth('type', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { type } = filteredData[rowIndex]
      return getCell(type, t)
    },
    copyText: rowIndex => filteredData[rowIndex].type,
  },
  {
    id: 'status',
    name: 'column.status',
    className: 'align-left',
    width: getColumnWidth('status', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { status } = filteredData[rowIndex]
      return getCell(status, t)
    },
    copyText: rowIndex => filteredData[rowIndex].status,
  },
  {
    id: 'rate',
    name: 'column.rateperc',
    width: getColumnWidth('rate', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { rate } = filteredData[rowIndex]
      return getCell(fixedFloat(rate), t)
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
    id: 'mtsUpdate',
    className: 'align-left',
    nameStr: `${t('column.date')} (${timeOffset})`,
    width: getColumnWidth('mtsUpdate', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const timestamp = getFullTime(filteredData[rowIndex].mtsUpdate)
      return getCell(timestamp, t)
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsUpdate),
  },
]
