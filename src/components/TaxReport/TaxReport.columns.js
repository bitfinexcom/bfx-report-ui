import { mapSymbol } from 'state/symbols/utils'
import { formatAmount, fixedFloat } from 'ui/utils'
import {
  getCell, getCellState, getColumnWidth, getTooltipContent,
} from 'utils/columns'

export const getColumns = ({
  t,
  isNoData,
  isLoading,
  getFullTime,
  filteredData,
  columnsWidth,
}) => [
  {
    id: 'asset',
    width: getColumnWidth('asset', columnsWidth),
    name: 'taxreport.cols.currency',
    className: 'align-left',
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { asset } = filteredData[rowIndex]
      const preparedAsset = mapSymbol(asset)
      const tooltip = getTooltipContent(preparedAsset, t)
      return getCell(preparedAsset, tooltip)
    },
    copyText: rowIndex => mapSymbol(filteredData[rowIndex].asset),
  },
  {
    id: 'amount',
    width: getColumnWidth('amount', columnsWidth),
    name: 'taxreport.cols.amount',
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { amount } = filteredData[rowIndex]
      const tooltip = getTooltipContent(fixedFloat(amount), t)
      return getCell(formatAmount(amount), tooltip)
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].amount),
  },
  {
    id: 'mtsAcquired',
    width: getColumnWidth('mtsAcquired', columnsWidth),
    name: 'taxreport.cols.dateAcquired',
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const timestamp = getFullTime(filteredData[rowIndex].mtsAcquired)
      const tooltip = getTooltipContent(timestamp, t)
      return getCell(timestamp, tooltip)
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsAcquired),
  },
  {
    id: 'mtsSold',
    width: getColumnWidth('mtsSold', columnsWidth),
    name: 'taxreport.cols.dateSold',
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const timestamp = getFullTime(filteredData[rowIndex].mtsSold)
      const tooltip = getTooltipContent(timestamp, t)
      return getCell(timestamp, tooltip)
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsSold),
  },
  {
    id: 'proceeds',
    width: getColumnWidth('proceeds', columnsWidth),
    name: 'taxreport.cols.proceeds',
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { proceeds } = filteredData[rowIndex]
      const tooltip = getTooltipContent(fixedFloat(proceeds), t)
      return getCell(formatAmount(proceeds), tooltip)
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].proceeds),
  },
  {
    id: 'cost',
    width: getColumnWidth('cost', columnsWidth),
    name: 'taxreport.cols.cost',
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { cost } = filteredData[rowIndex]
      const tooltip = getTooltipContent(fixedFloat(cost), t)
      return getCell(formatAmount(cost), tooltip)
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].cost),
  },
  {
    id: 'gainOrLoss',
    width: getColumnWidth('gainOrLoss', columnsWidth),
    name: 'taxreport.cols.gainOrLoss',
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { gainOrLoss } = filteredData[rowIndex]
      const tooltip = getTooltipContent(fixedFloat(gainOrLoss), t)
      return getCell(formatAmount(gainOrLoss), tooltip)
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].gainOrLoss),
  },
]
