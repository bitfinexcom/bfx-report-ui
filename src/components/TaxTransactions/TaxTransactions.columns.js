import React from 'react'
import { Cell } from '@blueprintjs/table'

import { formatAmount, fixedFloat } from 'ui/utils'
import { getCellState, getTooltipContent } from 'utils/columns'

export const getColumns = ({
  t,
  isNoData,
  isLoading,
  getFullTime,
  filteredData,
}) => [
  {
    id: 'asset',
    width: 178,
    name: 'taxreport.cols.currency',
    className: 'align-left',
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { asset } = filteredData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(asset, t)}>
          {asset}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].asset,
  },
  {
    id: 'amount',
    width: 178,
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
    width: 178,
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
    width: 178,
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
    width: 178,
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
    width: 178,
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
    width: 178,
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
