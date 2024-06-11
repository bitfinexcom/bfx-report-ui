import React from 'react'
import { Cell } from '@blueprintjs/table'

import { formatAmount, fixedFloat } from 'ui/utils'
import {
  getCell, getCellState, getColumnWidth, getTooltipContent,
} from 'utils/columns'

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
    id: 'price',
    name: 'column.priceDeriv',
    width: getColumnWidth('price', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { price } = filteredData[rowIndex]
      return getCell(fixedFloat(price), t)
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].price),
  },
  {
    id: 'priceSpot',
    name: 'column.priceSpot',
    width: getColumnWidth('priceSpot', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { priceSpot } = filteredData[rowIndex]
      return getCell(fixedFloat(priceSpot), t)
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].priceSpot),
  },
  {
    id: 'fundBal',
    name: 'column.fundBalance',
    width: getColumnWidth('fundBal', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { fundBal } = filteredData[rowIndex]
      return getCell(fixedFloat(fundBal), t)
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].fundBal),
  },
  {
    id: 'fundingAccrued',
    name: 'column.fundingAccrued',
    width: getColumnWidth('fundingAccrued', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { fundingAccrued } = filteredData[rowIndex]
      return getCell(formatAmount(fundingAccrued), t, fixedFloat(fundingAccrued))
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].fundingAccrued),
  },
  {
    id: 'fundingStep',
    name: 'column.fundingStep',
    width: getColumnWidth('fundingStep', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { fundingStep } = filteredData[rowIndex]
      return getCell(fundingStep, t)
    },
    copyText: rowIndex => filteredData[rowIndex].fundingStep,
  },
  {
    id: 'timestamp',
    className: 'align-left',
    nameStr: `${t('column.updated')} (${timeOffset})`,
    width: getColumnWidth('timestamp', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const timestamp = getFullTime(filteredData[rowIndex].timestamp)
      return getCell(timestamp, t)
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].timestamp),
  },
  {
    id: 'clampMin',
    name: 'column.clampMin',
    width: getColumnWidth('clampMin', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { clampMin } = filteredData[rowIndex]
      return getCell(clampMin, t)
    },
    copyText: rowIndex => filteredData[rowIndex].clampMin,
  },
  {
    id: 'clampMax',
    name: 'column.clampMax',
    width: getColumnWidth('clampMax', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { clampMax } = filteredData[rowIndex]
      return getCell(clampMax, t)
    },
    copyText: rowIndex => filteredData[rowIndex].clampMax,
  },
]
