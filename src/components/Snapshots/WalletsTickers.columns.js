import React from 'react'

import { Cell } from '@blueprintjs/table'

import { formatAmount, fixedFloat } from 'ui/utils'

export default function getColumns(props) {
  const { filteredData, t } = props

  return [
    {
      id: 'type',
      name: 'snapshots.column.type',
      width: 80,
      renderer: (rowIndex) => {
        const { walletType } = filteredData[rowIndex]
        const walletTypeText = t(`wallets.header.${walletType}`)
        return (
          <Cell tooltip={walletTypeText}>
            {walletTypeText}
          </Cell>
        )
      },
      copyText: (rowIndex) => {
        const { walletType } = filteredData[rowIndex]
        return t(`wallets.header.${walletType}`)
      },
    },
    {
      id: 'pair',
      name: 'tickers.column.pair',
      width: 80,
      renderer: (rowIndex) => {
        const { pair } = filteredData[rowIndex]
        return (
          <Cell tooltip={pair}>
            {pair}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].pair,
    },
    {
      id: 'amount',
      name: 'snapshots.column.amount',
      width: 120,
      renderer: (rowIndex) => {
        const { amount } = filteredData[rowIndex]
        return (
          <Cell tooltip={fixedFloat(amount)}>
            {formatAmount(amount)}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].amount,
    },
  ]
}
