import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { formatAmount, fixedFloat } from 'ui/utils'

export default function getColumns(props) {
  const {
    filteredData,
    getFullTime,
    t,
    timeOffset,
  } = props

  return [
    {
      id: 'id',
      name: 'column.id',
      width: 80,
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
      id: 'symbol',
      name: 'foffer.column.symbol',
      width: 100,
      renderer: (rowIndex) => {
        const { symbol } = filteredData[rowIndex]
        return (
          <Cell tooltip={symbol}>
            {symbol}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].symbol,
    },
    {
      id: 'amount',
      name: 'foffer.column.amount',
      width: 100,
      renderer: (rowIndex) => {
        const { amountOrig } = filteredData[rowIndex]
        const fixedAmount = fixedFloat(amountOrig)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedAmount}
          >
            {fixedAmount}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].amountOrig,
    },
    {
      id: 'amountExecuted',
      name: 'foffer.column.amount-exe',
      width: 150,
      renderer: (rowIndex) => {
        const { amountExecuted } = filteredData[rowIndex]
        return (
          <Cell tooltip={fixedFloat(amountExecuted)}>
            {formatAmount(amountExecuted)}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].amountExecuted,
    },
    {
      id: 'type',
      name: 'foffer.column.type',
      width: 100,
      renderer: (rowIndex) => {
        const { type } = filteredData[rowIndex]
        return (
          <Cell tooltip={type}>
            {type}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].type,
    },
    {
      id: 'status',
      name: 'foffer.column.status',
      width: 200,
      renderer: (rowIndex) => {
        const { status } = filteredData[rowIndex]
        return (
          <Cell tooltip={status}>
            {status}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].status,
    },
    {
      id: 'rate',
      name: 'foffer.column.rate',
      width: 150,
      renderer: (rowIndex) => {
        const { rate } = filteredData[rowIndex]
        const fixedRate = fixedFloat(rate)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedRate}
          >
            {fixedRate}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].rate,
    },
    {
      id: 'period',
      name: 'foffer.column.period',
      width: 80,
      renderer: (rowIndex) => {
        const period = `${filteredData[rowIndex].period} ${t('foffer.column.days')}`
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
        const days = t('foffer.column.days')
        return `${filteredData[rowIndex].period} ${days}`
      },
    },
    {
      id: 'mtsUpdate',
      nameStr: `${t('foffer.column.updated')} (${timeOffset})`,
      width: 150,
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mtsUpdate)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsUpdate),
    },
  ]
}
