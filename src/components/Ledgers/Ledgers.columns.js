import React from 'react'
import { Cell } from '@blueprintjs/table'

import { insertIf, fixedFloat, formatAmount } from 'ui/utils'
import queryConstants from 'state/query/constants'
import config from 'config'
import { getColumnWidth } from 'utils/columns'

const getTooltipContent = (value, t) => {
  if (t) return `${value}\n${t('column.deselectionHint')}`
  return `${value}`
}

export default function getColumns(props) {
  const {
    columnsWidth,
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
      className: 'align-left',
      width: getColumnWidth('id', columnsWidth),
      renderer: (rowIndex) => {
        const { id } = filteredData[rowIndex]
        return (
          <Cell tooltip={getTooltipContent(id)}>
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
        className: 'align-left',
        width: getColumnWidth('description', columnsWidth),
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
      className: 'align-left',
      width: getColumnWidth('currency', columnsWidth),
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
      width: getColumnWidth('amount', columnsWidth),
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
      isNumericValue: true,
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].amount),
    },
    ...insertIf(config.showFrameworkMode, (
      {
        id: 'amountUsd',
        name: 'column.amountUsd',
        width: getColumnWidth('amountUsd', columnsWidth),
        renderer: (rowIndex) => {
          const { amountUsd } = filteredData[rowIndex]
          const tooltip = getTooltipContent(`${fixedFloat(amountUsd)} ${t('column.usd')}`)
          return (
            <Cell
              className='bitfinex-text-align-right'
              tooltip={tooltip}
            >
              {formatAmount(amountUsd)}
            </Cell>
          )
        },
        isNumericValue: true,
        copyText: rowIndex => fixedFloat(filteredData[rowIndex].amountUsd),
      }
    )),
    {
      id: 'balance',
      name: 'column.balance',
      width: getColumnWidth('balance', columnsWidth),
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
      isNumericValue: true,
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].balance),
    },
    ...insertIf(config.showFrameworkMode, (
      {
        id: 'balanceUsd',
        name: 'column.balanceUsd',
        width: getColumnWidth('balanceUsd', columnsWidth),
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
        isNumericValue: true,
        copyText: rowIndex => fixedFloat(filteredData[rowIndex].balanceUsd),
      }
    )),
    {
      id: 'mts',
      nameStr: `${t('column.date')} (${timeOffset})`,
      className: 'align-left',
      width: getColumnWidth('mts', columnsWidth),
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mts)
        return (
          <Cell tooltip={timestamp}>
            {timestamp}
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mts),
    },
    {
      id: 'wallet',
      name: 'column.wallet',
      className: 'align-left',
      width: getColumnWidth('wallet', columnsWidth),
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
