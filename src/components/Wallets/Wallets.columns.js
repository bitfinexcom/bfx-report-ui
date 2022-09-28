import React from 'react'
import { Cell } from '@blueprintjs/table'

import { insertIf, fixedFloat } from 'ui/utils'
import { COLUMN_WIDTHS } from 'utils/columns'
import config from 'config'

export default function getColumns(props) {
  const { filteredData } = props

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
      width: COLUMN_WIDTHS.amount,
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
      isNumericValue: true,
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].balance),
    },
    ...insertIf(config.showFrameworkMode, (
      {
        id: 'balanceUsd',
        name: 'column.balanceUsd',
        width: COLUMN_WIDTHS.balanceUsd,
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
        isNumericValue: true,
        copyText: rowIndex => fixedFloat(filteredData[rowIndex].balanceUsd),
      }
    )),
  ]
}
