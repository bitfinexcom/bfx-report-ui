import { fixedFloat } from 'ui/utils'
import { getCell, getCellState, getColumnWidth } from 'utils/columns'

export const getColumns = ({
  t,
  isNoData,
  isLoading,
  timeOffset,
  getFullTime,
  columnsWidth,
  filteredData,
}) => [
  {
    id: 'symbol',
    name: 'column.pair',
    className: 'align-left',
    width: getColumnWidth('symbol', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { pair } = filteredData[rowIndex]
      return getCell(pair, t)
    },
    copyText: rowIndex => filteredData[rowIndex].pair,
  },
  {
    id: 'bid',
    name: 'column.bid',
    width: getColumnWidth('bid', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { bid } = filteredData[rowIndex]
      return getCell(fixedFloat(bid), t)
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].bid),
  },
  {
    id: 'ask',
    name: 'column.ask',
    width: getColumnWidth('ask', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { ask } = filteredData[rowIndex]
      return getCell(fixedFloat(ask), t)
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].ask),
  },
  {
    id: 'mtsUpdate',
    className: 'align-left',
    nameStr: `${t('column.time')} (${timeOffset})`,
    width: getColumnWidth('mtsUpdate', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const timestamp = getFullTime(filteredData[rowIndex].mtsUpdate)
      return getCell(timestamp, t)
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsUpdate),
  },
]
