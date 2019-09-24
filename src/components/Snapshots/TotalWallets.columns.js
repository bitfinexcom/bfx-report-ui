import React from 'react'
import { Cell } from '@blueprintjs/table'

import { fixedFloat, formatAmount } from 'ui/utils'

export default function getColumns(props) {
  const { walletsTotalBalanceUsd } = props

  return [
    {
      id: 'id',
      name: 'snapshots.column.wallets_total',
      width: 230,
      renderer: () => (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={fixedFloat(walletsTotalBalanceUsd)}
        >
          {formatAmount(walletsTotalBalanceUsd)}
        </Cell>
      ),
      copyText: () => fixedFloat(walletsTotalBalanceUsd),
    },
  ]
}
