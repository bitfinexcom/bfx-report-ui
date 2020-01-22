import React from 'react'
import { Cell } from '@blueprintjs/table'

import { insertIf, fixedFloat } from 'ui/utils'
import { platform } from 'var/config'

export default function getColumns(props) {
  const { filteredData, t } = props

  return [
    {
      id: 'currency',
      name: 'column.currency',
      width: 100,
      renderer: (rowIndex) => {
        const { currency } = filteredData[rowIndex]
        return (
          <Cell tooltip={currency}>
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
            tooltip={fixedBalance}
          >
            {fixedBalance}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].balance,
    },
    ...insertIf(platform.showFrameworkMode, (
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
              tooltip={fixedBalanceUsd}
            >
              {fixedBalanceUsd}
            </Cell>
          )
        },
        copyText: (rowIndex) => {
          const { balanceUsd } = filteredData[rowIndex]
          return `${fixedFloat(balanceUsd)} ${t('column.usd')}`
        },
      }
    )),
  ]
}
