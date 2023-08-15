import React from 'react'
import { Cell } from '@blueprintjs/table'

import { fixedFloat } from 'ui/utils'
import { getTooltipContent } from 'utils/columns'

export default function getColumns(props) {
  const { filteredData, t } = props

  return [
    {
      id: 'currency',
      name: 'column.currency',
      className: 'align-left',
      width: 100,
      renderer: (rowIndex) => {
        const { currency } = filteredData[rowIndex]
        return (
          <Cell tooltip={getTooltipContent(currency, t)}>
            {currency}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].currency,
    },
    {
      id: 'balance',
      name: 'column.balance',
      width: 200,
      renderer: (rowIndex) => {
        const { balance } = filteredData[rowIndex]
        const fixedBalance = fixedFloat(balance)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(fixedBalance, t)}
          >
            {fixedBalance}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].balance,
    },
    {
      id: 'balanceUsd',
      name: 'column.balanceUsd',
      width: 200,
      renderer: (rowIndex) => {
        const { balanceUsd } = filteredData[rowIndex]
        const fixedBalanceUsd = fixedFloat(balanceUsd)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(fixedBalanceUsd, t)}
          >
            {fixedBalanceUsd}
          </Cell>
        )
      },
      copyText: (rowIndex) => {
        const { balanceUsd } = filteredData[rowIndex]
        return `${fixedFloat(balanceUsd)} ${t('column.usd')}`
      },
    },
  ]
}
