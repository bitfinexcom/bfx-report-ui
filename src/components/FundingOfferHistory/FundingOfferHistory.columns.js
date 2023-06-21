import React from 'react'
import { Cell } from '@blueprintjs/table'

import { getColumnWidth } from 'utils/columns'
import { formatAmount, fixedFloat } from 'ui/utils'

export const getColumns = ({
  t,
  timeOffset,
  getFullTime,
  filteredData,
  columnsWidth,
}) => [
  {
    id: 'id',
    name: 'column.id',
    width: getColumnWidth('id', columnsWidth),
    renderer: (rowIndex) => {
      const { id } = filteredData[rowIndex]
      return (
        <Cell tooltip={id}>
          {id}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].id,
  },
  {
    id: 'symbol',
    name: 'column.currency',
    width: getColumnWidth('symbol', columnsWidth),
    renderer: (rowIndex) => {
      const { symbol } = filteredData[rowIndex]
      return (
        <Cell tooltip={symbol}>
          {symbol}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].symbol,
  },
  {
    id: 'amountOrig',
    name: 'column.amount',
    width: getColumnWidth('amountOrig', columnsWidth),
    renderer: (rowIndex) => {
      const { amountOrig } = filteredData[rowIndex]
      const fixedAmount = fixedFloat(amountOrig)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={fixedAmount}
        >
          {fixedAmount}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].amountOrig),
  },
  {
    id: 'amountExecuted',
    name: 'column.amount-exe',
    width: getColumnWidth('amountExecuted', columnsWidth),
    renderer: (rowIndex) => {
      const { amountExecuted } = filteredData[rowIndex]
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={fixedFloat(amountExecuted)}
        >
          {formatAmount(amountExecuted)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].amountExecuted),
  },
  {
    id: 'type',
    name: 'column.type',
    width: getColumnWidth('type', columnsWidth),
    renderer: (rowIndex) => {
      const { type } = filteredData[rowIndex]
      return (
        <Cell tooltip={type}>
          {type}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].type,
  },
  {
    id: 'status',
    name: 'column.status',
    width: getColumnWidth('status', columnsWidth),
    renderer: (rowIndex) => {
      const { status } = filteredData[rowIndex]
      return (
        <Cell tooltip={status}>
          {status}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].status,
  },
  {
    id: 'rate',
    name: 'column.rateperc',
    width: getColumnWidth('rate', columnsWidth),
    renderer: (rowIndex) => {
      const { rate } = filteredData[rowIndex]
      const fixedRate = fixedFloat(rate)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={fixedRate}
        >
          {fixedRate}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].rate),
  },
  {
    id: 'period',
    name: 'column.period',
    width: getColumnWidth('period', columnsWidth),
    renderer: (rowIndex) => {
      const period = `${filteredData[rowIndex].period} ${t('column.days')}`
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={period}
        >
          {period}
        </Cell>
      )
    },
    copyText: (rowIndex) => {
      const days = t('column.days')
      return `${filteredData[rowIndex].period} ${days}`
    },
  },
  {
    id: 'mtsUpdate',
    nameStr: `${t('column.date')} (${timeOffset})`,
    width: getColumnWidth('mtsUpdate', columnsWidth),
    renderer: (rowIndex) => {
      const timestamp = getFullTime(filteredData[rowIndex].mtsUpdate)
      return (
        <Cell tooltip={timestamp}>
          {timestamp}
        </Cell>
      )
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsUpdate),
  },
]
