import React from 'react'
import { Cell } from '@blueprintjs/table'

import { fixedFloat, formatAmount } from 'ui/utils'
import { getCellLoader, getCellNoData, getTooltipContent } from 'utils/columns'

export default function getColumns(props) {
  const {
    t,
    isNoData,
    isLoading,
    totalResult,
    positionsTotalPlUsd,
    walletsTotalBalanceUsd,
  } = props

  return [
    {
      id: 'walletsTotal',
      name: 'column.walletsTotal',
      width: 240,
      renderer: () => {
        if (isLoading) return getCellLoader(14, 72)
        if (isNoData) return getCellNoData(t('column.noResults'))
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(fixedFloat(walletsTotalBalanceUsd), t)}
          >
            {formatAmount(walletsTotalBalanceUsd)}
          </Cell>
        )
      },
      copyText: () => fixedFloat(walletsTotalBalanceUsd),
    },
    {
      id: 'positionsTotal',
      name: 'column.positionsTotal',
      width: 210,
      renderer: () => {
        if (isLoading) return getCellLoader(14, 72)
        if (isNoData) return getCellNoData()
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(fixedFloat(positionsTotalPlUsd), t)}
          >
            {formatAmount(positionsTotalPlUsd)}
          </Cell>
        )
      },
      copyText: () => fixedFloat(positionsTotalPlUsd),
    },
    {
      id: 'totalResult',
      name: 'column.totalResult',
      width: 160,
      renderer: () => {
        if (isLoading) return getCellLoader(14, 72)
        if (isNoData) return getCellNoData()
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(fixedFloat(totalResult), t)}
          >
            {formatAmount(totalResult)}
          </Cell>
        )
      },
      copyText: () => fixedFloat(totalResult),
    },
  ]
}
