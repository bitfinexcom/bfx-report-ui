import React from 'react'
import { Cell } from '@blueprintjs/table'

import { insertIf, fixedFloat } from 'ui/utils'
import { platform } from 'var/config'

export default function getColumns(props) {
  const { filteredData, t } = props

  return [
    {
      id: 'currency',
      name: 'wallets.column.currency',
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
      name: 'wallets.column.balance',
      width: 200,
      renderer: (rowIndex) => {
        const { balance } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={balance}
          >
            {balance}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].balance,
    },
    ...insertIf(platform.showFrameworkMode, (
      {
        id: 'balanceUsd',
        name: 'wallets.column.balanceUsd',
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
