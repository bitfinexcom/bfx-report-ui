import React from 'react'
import { Cell, TruncatedFormat } from '@blueprintjs/table'

import { insertIf, fixedFloat, formatAmount } from 'ui/utils'
import queryConstants from 'state/query/constants'
import config from 'config'
import { COLUMN_WIDTHS } from 'utils/columns'

export default function getColumns(props) {
  const {
    filteredData,
    getFullTime,
    t,
    target,
    timeOffset,
  } = props

  return [
    {
      id: 'id',
      name: 'column.id',
      width: COLUMN_WIDTHS.LEDGERS_ID,
      renderer: (rowIndex) => {
        const { id } = filteredData[rowIndex]
        return (
          <Cell tooltip={id}>
            {id}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].id,
    },
    ...insertIf(target !== queryConstants.MENU_FPAYMENT, (
      {
        id: 'description',
        name: 'column.description',
        width: COLUMN_WIDTHS.LEDGERS_DESCRIPTION,
        renderer: (rowIndex) => {
          const { description } = filteredData[rowIndex]
          return (
            <Cell tooltip={description}>
              {description}
            </Cell>
          )
        },
        copyText: rowIndex => filteredData[rowIndex].description,
      }
    )),
    {
      id: 'currency',
      name: 'column.currency',
      width: COLUMN_WIDTHS.SYMBOL,
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
      id: 'amount',
      name: 'column.amount',
      width: COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { amount, currency } = filteredData[rowIndex]
        const tooltip = `${fixedFloat(amount)} ${currency}`
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={tooltip}
          >
            {formatAmount(amount)}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].amount),
    },
    ...insertIf(config.showFrameworkMode, (
      {
        id: 'amountUsd',
        name: 'column.amountUsd',
        width: COLUMN_WIDTHS.AMOUNT,
        renderer: (rowIndex) => {
          const { amountUsd } = filteredData[rowIndex]
          const tooltip = `${fixedFloat(amountUsd)} ${t('column.usd')}`
          return (
            <Cell
              className='bitfinex-text-align-right'
              tooltip={tooltip}
            >
              {formatAmount(amountUsd)}
            </Cell>
          )
        },
        copyText: rowIndex => fixedFloat(filteredData[rowIndex].amountUsd),
      }
    )),
    {
      id: 'balance',
      name: 'column.balance',
      width: COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { balance, currency } = filteredData[rowIndex]
        const fixedBalance = fixedFloat(balance)
        const tooltip = `${fixedBalance} ${currency}`
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={tooltip}
          >
            {fixedBalance}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].balance),
    },
    ...insertIf(config.showFrameworkMode, (
      {
        id: 'balanceUsd',
        name: 'column.balanceUsd',
        width: COLUMN_WIDTHS.BALANCE_USD,
        renderer: (rowIndex) => {
          const { balanceUsd } = filteredData[rowIndex]
          const fixedBalanceUsd = fixedFloat(balanceUsd)
          const tooltip = `${fixedBalanceUsd} ${t('column.usd')}`
          return (
            <Cell
              className='bitfinex-text-align-right'
              tooltip={tooltip}
            >
              {fixedBalanceUsd}
            </Cell>
          )
        },
        copyText: rowIndex => fixedFloat(filteredData[rowIndex].balanceUsd),
      }
    )),
    {
      id: 'mts',
      nameStr: `${t('column.date')} (${timeOffset})`,
      width: COLUMN_WIDTHS.DATE,
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mts)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mts),
    },
    {
      id: 'wallet',
      name: 'column.wallet',
      width: COLUMN_WIDTHS.LEDGERS_WALLET,
      renderer: (rowIndex) => {
        const { wallet } = filteredData[rowIndex]
        return (
          <Cell tooltip={wallet}>
            {wallet}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].wallet,
    },
  ]
}
