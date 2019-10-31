import React from 'react'
import { Cell } from '@blueprintjs/table'

import { fixedFloat, formatAmount } from 'ui/utils'

export default function getColumns(props) {
  const { totalResult } = props

  return [
    {
      id: 'totalResult',
      name: 'taxreport.columns.totalResult',
      width: 160,
      renderer: () => (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={fixedFloat(totalResult)}
        >
          {formatAmount(totalResult)}
        </Cell>
      ),
      copyText: () => fixedFloat(totalResult),
    },
  ]
}
