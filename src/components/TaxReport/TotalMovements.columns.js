import React from 'react'
import { Cell } from '@blueprintjs/table'

import { fixedFloat, formatAmount } from 'ui/utils'

export default function getColumns(props) {
  const {
    depositsTotalAmount,
    withdrawalsTotalAmount,
    movementsTotalAmount,
  } = props

  return [
    {
      id: 'id',
      name: 'taxreport.deposits',
      width: 120,
      renderer: () => (
        <Cell tooltip={fixedFloat(depositsTotalAmount)}>
          {formatAmount(depositsTotalAmount)}
        </Cell>
      ),
      copyText: () => fixedFloat(depositsTotalAmount),
    },
    {
      id: 'id',
      name: 'taxreport.withdrawals',
      width: 120,
      renderer: () => (
        <Cell tooltip={fixedFloat(withdrawalsTotalAmount)}>
          {formatAmount(withdrawalsTotalAmount)}
        </Cell>
      ),
      copyText: () => fixedFloat(withdrawalsTotalAmount),
    },
    {
      id: 'id',
      name: 'taxreport.movementsTotal',
      width: 140,
      renderer: () => (
        <Cell tooltip={fixedFloat(movementsTotalAmount)}>
          {formatAmount(movementsTotalAmount)}
        </Cell>
      ),
      copyText: () => fixedFloat(movementsTotalAmount),
    },
  ]
}
