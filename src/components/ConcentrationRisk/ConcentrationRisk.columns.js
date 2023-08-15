import React from 'react'
import { Cell } from '@blueprintjs/table'

import { fixedFloat } from 'ui/utils'

export const getColumns = ({ data }) => [
  {
    id: 'currency',
    name: 'column.currency',
    className: 'align-left',
    width: 100,
    renderer: (rowIndex) => {
      const { currency } = data[rowIndex]
      return (
        <Cell tooltip={currency}>
          {currency}
        </Cell>
      )
    },
    copyText: rowIndex => data[rowIndex].currency,
  },
  {
    id: 'balanceUsd',
    name: 'column.balanceUsd',
    width: 150,
    renderer: (rowIndex) => {
      const { balanceUsd } = data[rowIndex]
      const fixedBalanceUsd = fixedFloat(balanceUsd)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={fixedBalanceUsd}
        >
          {fixedBalanceUsd}
        </Cell>
      )
    },
    copyText: rowIndex => fixedFloat(data[rowIndex].balanceUsd),
  },
  {
    id: 'percent',
    name: 'column.percent',
    width: 150,
    renderer: (rowIndex) => {
      const { percent } = data[rowIndex]
      const fixedPercent = fixedFloat(percent)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={fixedPercent}
        >
          {fixedPercent}
        </Cell>
      )
    },
    copyText: rowIndex => fixedFloat(data[rowIndex].percent),
  },
]
