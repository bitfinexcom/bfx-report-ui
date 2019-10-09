import React from 'react'
import { Cell } from '@blueprintjs/table'

import { fixedFloat, formatAmount } from 'ui/utils'

export default function getColumns(props) {
  const {
    walletsTotalBalanceUsd,
    positionsTotalPlUsd,
    totalResult,
  } = props

  return [
    {
      id: 'walletsTotal',
      name: 'taxreport.columns.walletsTotal',
      width: 240,
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
    {
      id: 'positionsTotal',
      name: 'taxreport.columns.positionsTotal',
      width: 210,
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
