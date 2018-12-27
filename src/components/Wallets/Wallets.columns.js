import React from 'react'
import { Cell } from '@blueprintjs/table'

export default function getColumns(props) {
  const { filteredData } = props

  return [
    {
      id: 'currency',
      name: 'wallets.column.currency',
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
      id: 'balance',
      name: 'wallets.column.balance',
      width: 200,
      renderer: (rowIndex) => {
        const { balance } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={balance}
          >
            {balance}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].balance,
    },
    {
      id: 'unsettledInterest',
      name: 'wallets.column.unsettled-interest',
      width: 180,
      renderer: (rowIndex) => {
        const { unsettledInterest } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={unsettledInterest}
          >
            {unsettledInterest}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].unsettledInterest,
    },
    {
      id: 'balanceAvailable',
      name: 'wallets.column.balance-available',
      width: 200,
      renderer: (rowIndex) => {
        const { balanceAvailable } = filteredData[rowIndex]
        return (
          <Cell tooltip={balanceAvailable}>
            {balanceAvailable}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].balanceAvailable,
    },
  ]
}
