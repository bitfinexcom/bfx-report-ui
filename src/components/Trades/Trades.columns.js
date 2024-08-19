import {
  getCell,
  getFeeCell,
  getCellState,
  getColumnWidth,
} from 'utils/columns'
import { formatAmount, fixedFloat } from 'ui/utils'
import { demapPairs, demapSymbols } from 'state/symbols/utils'

const getFeePercent = (entry) => {
  const {
    fee,
    execAmount,
    execPrice,
    pair,
    feeCurrency,
  } = entry

  const demappedPair = demapPairs(pair, true)
  const demappedFeeCurrency = demapSymbols(feeCurrency, true)
  const [firstCurr, secondCurr] = demappedPair.split(':')
  let val
  if (demappedFeeCurrency === firstCurr) {
    val = fee / execAmount
  }
  if (demappedFeeCurrency === secondCurr) {
    val = fee / (execAmount * execPrice)
  }
  if (val) {
    return `${fixedFloat(Math.abs(val) * 100, 3)}%`
  }
  return '-'
}

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
    id: 'orderID',
    name: 'column.orderid',
    className: 'align-left',
    width: getColumnWidth('orderID', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { orderID } = filteredData[rowIndex]
      return getCell(orderID, t)
    },
    copyText: rowIndex => filteredData[rowIndex].orderID,
  },
  {
    id: 'pair',
    name: 'column.pair',
    className: 'align-left',
    width: getColumnWidth('pair', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { pair } = filteredData[rowIndex]
      return getCell(pair, t)
    },
    copyText: rowIndex => filteredData[rowIndex].pair,
  },
  {
    id: 'execAmount',
    name: 'column.amount',
    width: getColumnWidth('execAmount', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { execAmount } = filteredData[rowIndex]
      return getCell(formatAmount(execAmount), t, fixedFloat(execAmount))
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].execAmount),
  },
  {
    id: 'execPrice',
    name: 'column.price',
    width: getColumnWidth('execPrice', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { execPrice } = filteredData[rowIndex]
      return getCell(fixedFloat(execPrice), t)
    },
    isNumericValue: true,
    copyText: rowIndex => filteredData[rowIndex].execPrice,
  },
  {
    id: 'fee',
    name: 'column.fee',
    width: getColumnWidth('fee', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { fee, feeCurrency } = filteredData[rowIndex]
      return getFeeCell(fee, feeCurrency, t, `${fixedFloat(fee)} ${feeCurrency}`)
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].fee),
  },
  {
    id: 'feePercent',
    name: 'column.feePercent',
    width: getColumnWidth('feePercent', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const feePercent = getFeePercent(filteredData[rowIndex])
      return getCell(feePercent, t)
    },
    copyText: rowIndex => getFeePercent(filteredData[rowIndex]),
  },
  {
    id: 'mtsCreate',
    className: 'align-left',
    nameStr: `${t('column.date')} (${timeOffset})`,
    width: getColumnWidth('mtsCreate', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const timestamp = getFullTime(filteredData[rowIndex].mtsCreate)
      return getCell(timestamp, t)
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsCreate),
  },
]
