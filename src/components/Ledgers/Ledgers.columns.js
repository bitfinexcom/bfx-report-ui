import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { formatTime } from 'state/utils'
import { amountStyle } from 'ui/utils'

export default function getColumns(props) {
  const { filteredData, timezone } = props

  return [
    {
      id: 'description',
      name: 'ledgers.column.description',
      width: 500,
      renderer: (rowIndex) => {
        const { description } = filteredData[rowIndex]
        return (
          <Cell tooltip={description}>
            {description}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].description,
    },
    {
      id: 'currency',
      name: 'ledgers.column.currency',
      width: 100,
      renderer: (rowIndex) => {
        const { currency } = filteredData[rowIndex]
        return (
          <Cell tooltip={currency}>
            {currency}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].currency,
    },
    {
      id: 'amount',
      name: 'ledgers.column.amount',
      width: 120,
      renderer: (rowIndex) => {
        const { amount, currency } = filteredData[rowIndex]
        const classes = amountStyle(amount)
        const tooltip = `${amount} ${currency}`
        return (
          <Cell
            className={classes}
            tooltip={tooltip}
          >
            {amount}
          </Cell>
        )
      },
      tooltip: (rowIndex) => {
        const { amount, currency } = filteredData[rowIndex]
        return `${amount} ${currency}`
      },
    },
    {
      id: 'balance',
      name: 'ledgers.column.balance',
      width: 120,
      renderer: (rowIndex) => {
        const { balance, currency } = filteredData[rowIndex]
        const tooltip = `${balance} ${currency}`
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={tooltip}
          >
            {balance}
          </Cell>
        )
      },
      tooltip: (rowIndex) => {
        const { balance, currency } = filteredData[rowIndex]
        return `${balance} ${currency}`
      },
    },
    {
      id: 'mts',
      name: 'ledgers.column.time',
      width: 150,
      renderer: (rowIndex) => {
        const mts = formatTime(filteredData[rowIndex].mts, timezone)
        return (
          <Cell tooltip={mts}>
            <TruncatedFormat>
              {mts}
            </TruncatedFormat>
          </Cell>
        )
      },
      tooltip: rowIndex => formatTime(filteredData[rowIndex].mts, timezone),
    },
    {
      id: 'wallet',
      name: 'ledgers.column.wallet',
      width: 80,
      renderer: (rowIndex) => {
        const { wallet } = filteredData[rowIndex]
        return (
          <Cell tooltip={wallet}>
            {wallet}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].wallet,
    },
  ]
}
