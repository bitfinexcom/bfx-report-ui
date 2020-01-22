import React from 'react'
import { Cell } from '@blueprintjs/table'

import { fixedFloat, formatAmount } from 'ui/utils'

export default function getColumns(props) {
  const { totalBalanceUsd } = props

  return [
    {
      id: 'id',
      name: 'column.wallets_total',
      width: 230,
      renderer: () => (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={fixedFloat(totalBalanceUsd)}
        >
          {formatAmount(totalBalanceUsd)}
        </Cell>
      ),
      copyText: () => fixedFloat(totalBalanceUsd),
    },
  ]
}
