import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { getSideMsg, getSideColor } from 'state/utils'
import { formatAmount, formatColor, fixedFloat } from 'ui/utils'
import { COLUMN_WIDTHS, getColumnWidth } from 'utils/columns'

export default function getColumns(props) {
  const {
    columnsWidth,
    filteredData,
    getFullTime,
    t,
    timeOffset,
  } = props

  return [
    {
      id: 'id',
      name: 'column.id',
      width: getColumnWidth('id', columnsWidth) || 80,
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
      width: getColumnWidth('symbol', columnsWidth) || COLUMN_WIDTHS.SYMBOL,
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
      width: getColumnWidth('side', columnsWidth) || 90,
      renderer: (rowIndex) => {
        const { side } = filteredData[rowIndex]
        const formattedSide = t(`floan.side.${getSideMsg(side)}`)
        return (
          <Cell tooltip={formattedSide}>
            {formatColor(formattedSide, getSideColor(side))}
          </Cell>
        )
      },
      copyText: rowIndex => t(`floan.side.${getSideMsg(filteredData[rowIndex].side)}`),
    },
    {
      id: 'amount',
      name: 'column.amount',
      width: getColumnWidth('amount', columnsWidth) || COLUMN_WIDTHS.AMOUNT,
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
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].amount),
    },
    {
      id: 'status',
      name: 'column.status',
      width: getColumnWidth('status', columnsWidth) || 150,
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
      width: getColumnWidth('type', columnsWidth) || 100,
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
      width: getColumnWidth('rate', columnsWidth) || COLUMN_WIDTHS.RATE,
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
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].rate),
    },
    {
      id: 'period',
      name: 'column.period',
      width: getColumnWidth('period', columnsWidth) || COLUMN_WIDTHS.PERIOD,
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
      copyText: rowIndex => `${filteredData[rowIndex].period} ${t('column.days')}`,
    },
    {
      id: 'mtsOpening',
      nameStr: `${t('column.opened')} (${timeOffset})`,
      width: getColumnWidth('mtsOpening', columnsWidth) || COLUMN_WIDTHS.DATE,
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mtsOpening)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsOpening),
    },
    {
      id: 'mtsLastPayout',
      nameStr: `${t('column.closed')} (${timeOffset})`,
      width: getColumnWidth('mtsLastPayout', columnsWidth) || COLUMN_WIDTHS.DATE,
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mtsLastPayout)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsLastPayout),
    },
    {
      id: 'mtsUpdate',
      nameStr: `${t('column.date')} (${timeOffset})`,
      width: getColumnWidth('mtsUpdate', columnsWidth) || COLUMN_WIDTHS.DATE,
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mtsUpdate)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsUpdate),
    },
  ]
}
