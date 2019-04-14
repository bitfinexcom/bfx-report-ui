import React from 'react'
import { Cell } from '@blueprintjs/table'

import { fixedFloat } from 'ui/utils'

export default function getColumns(props) {
  const { data, t } = props

  return [
    {
      id: 'currency',
      name: 'concentrationrisk.column.currency',
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
      name: 'concentrationrisk.column.balanceUsd',
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
      copyText: (rowIndex) => {
        const { balanceUsd } = data[rowIndex]
        return `${fixedFloat(balanceUsd)} ${t('column.usd')}`
      },
    },
  ]
}
