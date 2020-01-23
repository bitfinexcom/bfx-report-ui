import React from 'react'
import { Cell } from '@blueprintjs/table'

import { fixedFloat, formatAmount } from 'ui/utils'

export default function getColumns(props) {
  const { movementsTotalAmount } = props

  return [
    {
      id: 'movementsTotal',
      name: 'column.movementsTotal',
      width: 260,
      renderer: () => (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={fixedFloat(movementsTotalAmount)}
        >
          {formatAmount(movementsTotalAmount)}
        </Cell>
      ),
      copyText: () => fixedFloat(movementsTotalAmount),
    },
  ]
}
