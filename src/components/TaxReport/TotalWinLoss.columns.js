import React from 'react'
import { Cell } from '@blueprintjs/table'

import { fixedFloat, formatAmount } from 'ui/utils'

export default function getColumns(props) {
  const { winLossTotalAmount } = props

  return [
    {
      id: 'id',
      name: 'taxreport.winloss',
      width: 170,
      renderer: () => (
        <Cell tooltip={fixedFloat(winLossTotalAmount)}>
          {formatAmount(winLossTotalAmount)}
        </Cell>
      ),
      copyText: () => fixedFloat(winLossTotalAmount),
    },
  ]
}
