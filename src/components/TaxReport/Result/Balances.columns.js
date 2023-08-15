import React from 'react'
import { Cell } from '@blueprintjs/table'

import { getTooltipContent } from 'utils/columns'
import { fixedFloat, formatAmount } from 'ui/utils'

export default function getColumns(props) {
  const {
    t,
    totalResult,
    positionsTotalPlUsd,
    walletsTotalBalanceUsd,
  } = props

  return [
    {
      id: 'walletsTotal',
      name: 'column.walletsTotal',
      width: 240,
      renderer: () => (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(fixedFloat(walletsTotalBalanceUsd), t)}
        >
          {formatAmount(walletsTotalBalanceUsd)}
        </Cell>
      ),
      copyText: () => fixedFloat(walletsTotalBalanceUsd),
    },
    {
      id: 'positionsTotal',
      name: 'column.positionsTotal',
      width: 210,
      renderer: () => (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(fixedFloat(positionsTotalPlUsd), t)}
        >
          {formatAmount(positionsTotalPlUsd)}
        </Cell>
      ),
      copyText: () => fixedFloat(positionsTotalPlUsd),
    },
    {
      id: 'totalResult',
      name: 'column.totalResult',
      width: 160,
      renderer: () => (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(fixedFloat(totalResult), t)}
        >
          {formatAmount(totalResult)}
        </Cell>
      ),
      copyText: () => fixedFloat(totalResult),
    },
  ]
}
