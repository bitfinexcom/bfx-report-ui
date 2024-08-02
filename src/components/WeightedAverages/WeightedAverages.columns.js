import React from 'react'
import { Cell } from '@blueprintjs/table'

import { formatAmount, fixedFloat } from 'ui/utils'
import { getCell, getCellState, getColumnWidth, getTooltipContent } from 'utils/columns'

export const getColumns = ({
  t,
  isNoData,
  isLoading,
  getFullTime,
  filteredData,
  columnsWidth,
}) => [
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
    id: 'buyingWeightedPrice',
    name: 'column.buyingWeightedPrice',
    width: getColumnWidth('buyingWeightedPrice', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { buyingWeightedPrice } = filteredData[rowIndex]
      return getCell(fixedFloat(buyingWeightedPrice), t)
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].buyingWeightedPrice),
  },
  {
    id: 'buyingAmount',
    name: 'column.buyingAmount',
    width: getColumnWidth('buyingAmount', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { buyingAmount } = filteredData[rowIndex]
      return getCell(formatAmount(buyingAmount), t, fixedFloat(buyingAmount))
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].buyingAmount),
  },
  {
    id: 'cost',
    name: 'column.cost',
    width: getColumnWidth('cost', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { cost } = filteredData[rowIndex]
      return getCell(formatAmount(cost), t, fixedFloat(cost))
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].cost),
  },
  {
    id: 'sellingWeightedPrice',
    name: 'column.sellingWeightedPrice',
    width: getColumnWidth('sellingWeightedPrice', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { sellingWeightedPrice } = filteredData[rowIndex]
      return getCell(fixedFloat(sellingWeightedPrice), t)
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].sellingWeightedPrice),
  },
  {
    id: 'sellingAmount',
    name: 'column.sellingAmount',
    width: getColumnWidth('sellingAmount', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { sellingAmount } = filteredData[rowIndex]
      return getCell(formatAmount(sellingAmount), t, fixedFloat(sellingAmount))
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].sellingAmount),
  },
  {
    id: 'sale',
    name: 'column.sale',
    width: getColumnWidth('sale', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { sale } = filteredData[rowIndex]
      return getCell(formatAmount(sale), t, fixedFloat(sale))
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].sale),
  },
  {
    id: 'cumulativeAmount',
    name: 'column.cumulativeAmount',
    width: getColumnWidth('cumulativeAmount', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { cumulativeAmount } = filteredData[rowIndex]
      return getCell(formatAmount(cumulativeAmount), t, fixedFloat(cumulativeAmount))
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].cumulativeAmount),
  },
  {
    id: 'firstTradeMts',
    name: 'column.firstTrade',
    width: getColumnWidth('firstTradeMts', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const timestamp = getFullTime(filteredData[rowIndex].firstTradeMts)
      return getCell(timestamp, t)
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].firstTradeMts),
  },
  {
    id: 'lastTradeMts',
    name: 'column.lastTrade',
    width: getColumnWidth('lastTradeMts', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const timestamp = getFullTime(filteredData[rowIndex].lastTradeMts)
      return getCell(timestamp, t)
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].lastTradeMts),
  },
]
