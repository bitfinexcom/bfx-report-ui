import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { amountStyle } from 'ui/utils'

export default function getColumns(props) {
  const { filteredData, getFullTime } = props

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
      copyText: rowIndex => filteredData[rowIndex].description,
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
      copyText: rowIndex => filteredData[rowIndex].currency,
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
      copyText: (rowIndex) => {
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
      copyText: (rowIndex) => {
        const { balance, currency } = filteredData[rowIndex]
        return `${balance} ${currency}`
      },
    },
    {
      id: 'mts',
      name: 'ledgers.column.time',
      width: 150,
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mts)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mts),
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
      copyText: rowIndex => filteredData[rowIndex].wallet,
    },
  ]
}
