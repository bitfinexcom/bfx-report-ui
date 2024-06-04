import React from 'react'
import { Cell } from '@blueprintjs/table'
import { isEqual } from '@bitfinex/lib-js-util-base'

import config from 'config'
import queryConstants from 'state/query/constants'
import { insertIf, fixedFloat, formatAmount } from 'ui/utils'
import { getCellState, getColumnWidth, getTooltipContent } from 'utils/columns'

const { showFrameworkMode } = config
const { MENU_FPAYMENT } = queryConstants

export default function getColumns(props) {
  const {
    t,
    target,
    isNoData,
    isLoading,
    timeOffset,
    getFullTime,
    filteredData,
    columnsWidth,
  } = props

  return [
    {
      id: 'id',
      name: 'column.id',
      className: 'align-left',
      width: getColumnWidth('id', columnsWidth),
      renderer: (rowIndex) => {
        if (isLoading || isNoData) {
          return getCellState(isLoading, isNoData)
        }
        const { id } = filteredData[rowIndex]
        return (
          <Cell tooltip={getTooltipContent(id, t)}>
            {id}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].id,
    },
    ...insertIf(!isEqual(target, MENU_FPAYMENT), (
      {
        id: 'description',
        name: 'column.description',
        className: 'align-left',
        width: getColumnWidth('description', columnsWidth),
        renderer: (rowIndex) => {
          if (isLoading || isNoData) {
            return getCellState(isLoading, isNoData)
          }
          const { description } = filteredData[rowIndex]
          return (
            <Cell tooltip={getTooltipContent(description, t)}>
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
        if (isLoading || isNoData) {
          return getCellState(isLoading, isNoData)
        }
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
      id: 'amount',
      name: 'column.amount',
      width: getColumnWidth('amount', columnsWidth),
      renderer: (rowIndex) => {
        if (isLoading || isNoData) {
          return getCellState(isLoading, isNoData)
        }
        const { amount, currency } = filteredData[rowIndex]
        const tooltip = getTooltipContent(`${fixedFloat(amount)} ${currency}`, t)
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
    ...insertIf(showFrameworkMode, (
      {
        id: 'amountUsd',
        name: 'column.amountUsd',
        width: getColumnWidth('amountUsd', columnsWidth),
        renderer: (rowIndex) => {
          if (isLoading || isNoData) {
            return getCellState(isLoading, isNoData)
          }
          const { amountUsd } = filteredData[rowIndex]
          const tooltip = getTooltipContent(`${fixedFloat(amountUsd)} ${t('column.usd')}`, t)
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
        if (isLoading || isNoData) {
          return getCellState(isLoading, isNoData)
        }
        const { balance, currency } = filteredData[rowIndex]
        const fixedBalance = fixedFloat(balance)
        const tooltip = getTooltipContent(`${fixedBalance} ${currency}`, t)
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
    ...insertIf(showFrameworkMode, (
      {
        id: 'balanceUsd',
        name: 'column.balanceUsd',
        width: getColumnWidth('balanceUsd', columnsWidth),
        renderer: (rowIndex) => {
          if (isLoading || isNoData) {
            return getCellState(isLoading, isNoData)
          }
          const { balanceUsd } = filteredData[rowIndex]
          const fixedBalanceUsd = fixedFloat(balanceUsd)
          const tooltip = getTooltipContent(`${fixedBalanceUsd} ${t('column.usd')}`, t)
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
        if (isLoading || isNoData) {
          return getCellState(isLoading, isNoData)
        }
        const timestamp = getFullTime(filteredData[rowIndex].mts)
        return (
          <Cell tooltip={getTooltipContent(timestamp, t)}>
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
        if (isLoading || isNoData) {
          return getCellState(isLoading, isNoData)
        }
        const { wallet } = filteredData[rowIndex]
        return (
          <Cell tooltip={getTooltipContent(wallet, t)}>
            {wallet}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].wallet,
    },
  ]
}
