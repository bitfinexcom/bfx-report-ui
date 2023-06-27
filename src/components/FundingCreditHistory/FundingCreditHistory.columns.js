import React from 'react'
import { Cell } from '@blueprintjs/table'

import { getColumnWidth } from 'utils/columns'
import { getSideMsg, getSideColor } from 'state/utils'
import { formatAmount, formatColor, fixedFloat } from 'ui/utils'

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
    className: 'align-left',
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
    className: 'align-left',
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
    id: 'side',
    name: 'column.side',
    className: 'align-left',
    width: getColumnWidth('side', columnsWidth),
    renderer: (rowIndex) => {
      const { side } = filteredData[rowIndex]
      const formattedSide = t(`fcredit.side.${getSideMsg(side)}`)
      return (
        <Cell tooltip={formattedSide}>
          {formatColor(formattedSide, getSideColor(side))}
        </Cell>
      )
    },
    copyText: rowIndex => t(`fcredit.side.${getSideMsg(filteredData[rowIndex].side)}`),
  },
  {
    id: 'amount',
    name: 'column.amount',
    width: getColumnWidth('amount', columnsWidth),
    renderer: (rowIndex) => {
      const { amount } = filteredData[rowIndex]
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={fixedFloat(amount)}
        >
          {formatAmount(amount)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].amount),
  },
  {
    id: 'status',
    name: 'column.status',
    className: 'align-left',
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
    id: 'type',
    name: 'column.type',
    className: 'align-left',
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
    id: 'rate',
    name: 'column.rateperc',
    width: getColumnWidth('rate', columnsWidth),
    renderer: (rowIndex) => {
      const { rate } = filteredData[rowIndex]
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={rate}
        >
          {fixedFloat(rate)}
        </Cell>
      )
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
    id: 'mtsOpening',
    className: 'align-left',
    nameStr: `${t('column.opened')} (${timeOffset})`,
    width: getColumnWidth('mtsOpening', columnsWidth),
    renderer: (rowIndex) => {
      const timestamp = getFullTime(filteredData[rowIndex].mtsOpening)
      return (
        <Cell tooltip={timestamp}>
          {timestamp}
        </Cell>
      )
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsOpening),
  },
  {
    id: 'mtsLastPayout',
    className: 'align-left',
    nameStr: `${t('column.lastpayout')} (${timeOffset})`,
    width: getColumnWidth('mtsLastPayout', columnsWidth),
    renderer: (rowIndex) => {
      const timestamp = getFullTime(filteredData[rowIndex].mtsLastPayout)
      return (
        <Cell tooltip={timestamp}>
          {timestamp}
        </Cell>
      )
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsLastPayout),
  },
  {
    id: 'positionPair',
    name: 'column.positionpair',
    className: 'align-left',
    width: getColumnWidth('positionPair', columnsWidth),
    renderer: (rowIndex) => {
      const { positionPair } = filteredData[rowIndex]
      return (
        <Cell tooltip={positionPair}>
          {positionPair}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].positionPair,
  },
  {
    id: 'mtsUpdate',
    className: 'align-left',
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
