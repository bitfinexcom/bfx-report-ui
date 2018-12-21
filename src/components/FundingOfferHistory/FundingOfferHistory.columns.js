import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { formatTime } from 'state/utils'
import { amountStyle } from 'ui/utils'

export default function getColumns(props) {
  const { filteredData, intl, timezone } = props

  return [
    {
      id: 'id',
      name: 'column.id',
      width: 80,
      renderer: (rowIndex) => {
        const { id } = filteredData[rowIndex]
        return (
          <Cell tooltip={id}>
            {id}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].id,
    },
    {
      id: 'symbol',
      name: 'foffer.column.symbol',
      width: 100,
      renderer: (rowIndex) => {
        const { symbol } = filteredData[rowIndex]
        return (
          <Cell tooltip={symbol}>
            {symbol}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].symbol,
    },
    {
      id: 'amount',
      name: 'foffer.column.amount',
      width: 100,
      renderer: (rowIndex) => {
        const { amountOrig } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={amountOrig}
          >
            {amountOrig}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].amountOrig,
    },
    {
      id: 'amountExecuted',
      name: 'foffer.column.amount-exe',
      width: 150,
      renderer: (rowIndex) => {
        const { amountExecuted } = filteredData[rowIndex]
        const classes = amountStyle(amountExecuted)
        return (
          <Cell
            className={classes}
            tooltip={amountExecuted}
          >
            {amountExecuted}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].amountExecuted,
    },
    {
      id: 'type',
      name: 'foffer.column.type',
      width: 100,
      renderer: (rowIndex) => {
        const { type } = filteredData[rowIndex]
        return (
          <Cell tooltip={type}>
            {type}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].type,
    },
    {
      id: 'status',
      name: 'foffer.column.status',
      width: 200,
      renderer: (rowIndex) => {
        const { status } = filteredData[rowIndex]
        return (
          <Cell tooltip={status}>
            {status}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].status,
    },
    {
      id: 'rate',
      name: 'foffer.column.rate',
      width: 150,
      renderer: (rowIndex) => {
        const { rate } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={rate}
          >
            {rate}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].rate,
    },
    {
      id: 'period',
      name: 'foffer.column.period',
      width: 80,
      renderer: (rowIndex) => {
        const period = `${filteredData[rowIndex].period} ${intl.formatMessage({ id: 'foffer.column.period.days' })}`
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={period}
          >
            {period}
          </Cell>
        )
      },
      tooltip: (rowIndex) => {
        const days = intl.formatMessage({ id: 'foffer.column.period.days' })
        return `${filteredData[rowIndex].period} ${days}`
      },
    },
    {
      id: 'mtsUpdate',
      name: 'foffer.column.updated',
      width: 150,
      renderer: (rowIndex) => {
        const mtsUpdate = formatTime(filteredData[rowIndex].mtsUpdate, timezone)
        return (
          <Cell tooltip={mtsUpdate}>
            <TruncatedFormat>
              {mtsUpdate}
            </TruncatedFormat>
          </Cell>
        )
      },
      tooltip: rowIndex => formatTime(filteredData[rowIndex].mtsUpdate, timezone),
    },
  ]
}
