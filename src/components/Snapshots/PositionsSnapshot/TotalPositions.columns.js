import React from 'react'
import { Cell } from '@blueprintjs/table'

import { fixedFloat, formatAmount } from 'ui/utils'

export default function getColumns(props) {
  const { totalPlUsd } = props

  return [
    {
      id: 'id',
      name: 'column.positions_total',
      width: 230,
      renderer: () => (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={fixedFloat(totalPlUsd)}
        >
          {formatAmount(totalPlUsd)}
        </Cell>
      ),
      copyText: () => fixedFloat(totalPlUsd),
    },
  ]
}
