import React from 'react'
import { Cell } from '@blueprintjs/table'

import { fixedFloat, formatAmount } from 'ui/utils'

export default function getColumns(props) {
  const { positionsTotalPlUsd } = props

  return [
    {
      id: 'id',
      name: 'snapshots.column.positions_total',
      width: 230,
      renderer: () => (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={fixedFloat(positionsTotalPlUsd)}
        >
          {formatAmount(positionsTotalPlUsd)}
        </Cell>
      ),
      copyText: () => fixedFloat(positionsTotalPlUsd),
    },
  ]
}
