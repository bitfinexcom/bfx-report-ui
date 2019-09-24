import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { fixedFloat, formatAmount } from 'ui/utils'
import { COLUMN_WIDTHS } from 'utils/columns'

export default function getColumns(props) {
  const {
    filteredData,
    getFullTime,
    t,
    targetSymbol,
    timeOffset,
  } = props

  return [
    {
      id: 'id',
      name: 'column.id',
      width: COLUMN_WIDTHS.ID,
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
    {
      id: 'mts',
      nameStr: `${t('publicfunding.column.time')} (${timeOffset})`,
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
      id: 'amount',
      name: 'publicfunding.column.amount',
      width: COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { amount } = filteredData[rowIndex]
        const fixedAmount = fixedFloat(amount)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedAmount}
          >
            {formatAmount(amount)}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].amount,
    },
    {
      id: 'rate',
      name: 'publicfunding.column.rate',
      width: COLUMN_WIDTHS.RATE,
      renderer: (rowIndex) => {
        const { rate } = filteredData[rowIndex]
        return (
          <Cell tooltip={fixedFloat(rate)}>
            {formatAmount(rate, 'red')}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].rate,
    },
    {
      id: 'period',
      name: 'publicfunding.column.period',
      width: COLUMN_WIDTHS.PERIOD,
      renderer: (rowIndex) => {
        const period = `${filteredData[rowIndex].period} ${t('publicfunding.column.days')}`
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={period}
          >
            {period}
          </Cell>
        )
      },
      copyText: (rowIndex) => {
        const days = t('publicfunding.column.days')
        return `${filteredData[rowIndex].period} ${days}`
      },
    },
    {
      id: 'currency',
      name: 'publicfunding.column.currency',
      width: COLUMN_WIDTHS.SYMBOL,
      renderer: () => {
        const currency = targetSymbol.toUpperCase()
        return (
          <Cell tooltip={currency}>
            {currency}
          </Cell>
        )
      },
      copyText: () => targetSymbol.toUpperCase(),
    },
  ]
}
