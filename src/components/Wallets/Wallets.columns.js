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
  ]
}
