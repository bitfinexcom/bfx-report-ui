import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { formatTime, getSideMsg } from 'state/utils'
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
      name: 'floan.column.symbol',
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
      id: 'side',
      name: 'floan.column.side',
      width: 80,
      renderer: (rowIndex) => {
        const side = intl.formatMessage({ id: `floan.side.${getSideMsg(filteredData[rowIndex].side)}` })
        return (
          <Cell tooltip={side}>
            {side}
          </Cell>
        )
      },
      tooltip: rowIndex => intl.formatMessage({ id: `floan.side.${getSideMsg(filteredData[rowIndex].side)}` }),
    },
    {
      id: 'amount',
      name: 'floan.column.amount',
      width: 100,
      renderer: (rowIndex) => {
        const { amount } = filteredData[rowIndex]
        const classes = amountStyle(amount)
        return (
          <Cell
            className={classes}
            tooltip={amount}
          >
            {amount}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].amount,
    },
    {
      id: 'status',
      name: 'floan.column.status',
      width: 150,
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
      name: 'floan.column.rate',
      width: 130,
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
      name: 'floan.column.period',
      width: 80,
      renderer: (rowIndex) => {
        const period = `${filteredData[rowIndex].period} ${intl.formatMessage({ id: 'floan.column.period.days' })}`
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={period}
          >
            {period}
          </Cell>
        )
      },
      tooltip: rowIndex => `${filteredData[rowIndex].period} ${intl.formatMessage({ id: 'floan.column.period.days' })}`,
    },
    {
      id: 'mtsOpening',
      name: 'floan.column.opening',
      width: 150,
      renderer: (rowIndex) => {
        const { mtsOpening } = filteredData[rowIndex]
        const opening = mtsOpening ? formatTime(mtsOpening, timezone) : ''
        return (
          <Cell tooltip={opening}>
            <TruncatedFormat>
              {opening}
            </TruncatedFormat>
          </Cell>
        )
      },
      tooltip: (rowIndex) => {
        const { mtsOpening } = filteredData[rowIndex]
        return mtsOpening ? formatTime(mtsOpening, timezone) : ''
      },
    },
    {
      id: 'mtsLastPayout',
      name: 'floan.column.lastpayout',
      width: 150,
      renderer: (rowIndex) => {
        const { mtsLastPayout } = filteredData[rowIndex]
        const payout = mtsLastPayout ? formatTime(mtsLastPayout, timezone) : ''
        return (
          <Cell tooltip={payout}>
            <TruncatedFormat>
              {payout}
            </TruncatedFormat>
          </Cell>
        )
      },
      tooltip: (rowIndex) => {
        const { mtsLastPayout } = filteredData[rowIndex]
        return mtsLastPayout ? formatTime(mtsLastPayout, timezone) : ''
      },
    },
    {
      id: 'mtsUpdate',
      name: 'floan.column.updated',
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
