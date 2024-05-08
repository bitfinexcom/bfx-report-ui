import React from 'react'
import { Cell } from '@blueprintjs/table'

import { mapSymbol } from 'state/symbols/utils'
import { formatAmount, fixedFloat } from 'ui/utils'
import { getCellState, getColumnWidth, getTooltipContent } from 'utils/columns'

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
      return (
        <Cell tooltip={getTooltipContent(preparedAsset, t)}>
          {preparedAsset}
        </Cell>
      )
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
      const tooltip = fixedFloat(amount)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(tooltip, t)}
        >
          {formatAmount(amount)}
        </Cell>
      )
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
      return (
        <Cell tooltip={getTooltipContent(timestamp, t)}>
          {timestamp}
        </Cell>
      )
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
      return (
        <Cell tooltip={getTooltipContent(timestamp, t)}>
          {timestamp}
        </Cell>
      )
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
      const tooltip = fixedFloat(proceeds)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(tooltip, t)}
        >
          {formatAmount(proceeds)}
        </Cell>
      )
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
      const tooltip = fixedFloat(cost)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(tooltip, t)}
        >
          {formatAmount(cost)}
        </Cell>
      )
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
      const tooltip = fixedFloat(gainOrLoss)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(tooltip, t)}
        >
          {formatAmount(gainOrLoss)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].gainOrLoss),
  },
]
