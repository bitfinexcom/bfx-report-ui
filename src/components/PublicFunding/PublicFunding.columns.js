import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { amountStyle } from 'ui/utils'

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
      width: 85,
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
      width: 150,
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
      width: 150,
      renderer: (rowIndex) => {
        const amount = Math.abs(filteredData[rowIndex].amount)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={amount}
          >
            {amount}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].amount,
    },
    {
      id: 'rate',
      name: 'publicfunding.column.rate',
      width: 150,
      renderer: (rowIndex) => {
        const { rate } = filteredData[rowIndex]
        const classes = amountStyle(-rate)
        return (
          <Cell
            className={classes}
            tooltip={rate}
          >
            {rate}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].rate,
    },
    {
      id: 'period',
      name: 'publicfunding.column.period',
      width: 80,
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
      width: 100,
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
