import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { insertIf, fixedFloat, formatAmount } from 'ui/utils'
import { platform } from 'var/config'
import { COLUMN_WIDTHS } from 'utils/columns'

export default function getColumns(props) {
  const {
    filteredData,
    getFullTime,
    t,
    timeOffset,
  } = props

  return [
    {
      id: 'description',
      name: 'ledgers.column.description',
      width: 520,
      renderer: (rowIndex) => {
        const { description } = filteredData[rowIndex]
        return (
          <Cell tooltip={description}>
            {description}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].description,
    },
    {
      id: 'currency',
      name: 'ledgers.column.currency',
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
      name: 'ledgers.column.amount',
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
      copyText: (rowIndex) => {
        const { amount, currency } = filteredData[rowIndex]
        return `${amount} ${currency}`
      },
    },
    ...insertIf(platform.showFrameworkMode, (
      {
        id: 'amountUsd',
        name: 'ledgers.column.amountUsd',
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
        copyText: (rowIndex) => {
          const { amountUsd } = filteredData[rowIndex]
          return `${fixedFloat(amountUsd)} ${t('column.usd')}`
        },
      }
    )),
    {
      id: 'balance',
      name: 'ledgers.column.balance',
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
      copyText: (rowIndex) => {
        const { balance, currency } = filteredData[rowIndex]
        return `${balance} ${currency}`
      },
    },
    ...insertIf(platform.showFrameworkMode, (
      {
        id: 'balanceUsd',
        name: 'ledgers.column.balanceUsd',
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
        copyText: (rowIndex) => {
          const { balanceUsd } = filteredData[rowIndex]
          return `${fixedFloat(balanceUsd)} ${t('column.usd')}`
        },
      }
    )),
    {
      id: 'mts',
      nameStr: `${t('ledgers.column.time')} (${timeOffset})`,
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
      name: 'ledgers.column.wallet',
      width: 80,
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
