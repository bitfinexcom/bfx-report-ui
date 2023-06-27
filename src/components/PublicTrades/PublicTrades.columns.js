import React from 'react'
import { Cell } from '@blueprintjs/table'

import { formatAmount, fixedFloat, amountStyle } from 'ui/utils'
import { formatPair } from 'state/symbols/utils'
import { getColumnWidth } from 'utils/columns'

export default function getColumns(props) {
  const {
    columnsWidth,
    filteredData,
    getFullTime,
    t,
    targetPair,
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
          <Cell tooltip={id}>
            {id}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].id,
    },
    {
      id: 'mts',
      className: 'align-left',
      nameStr: `${t('column.time')} (${timeOffset})`,
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
      id: 'type',
      name: 'column.type',
      className: 'align-left',
      width: getColumnWidth('type', columnsWidth),
      renderer: (rowIndex) => {
        const { type, amount } = filteredData[rowIndex]
        const classes = amountStyle(amount)
        return (
          <Cell
            className={classes}
            tooltip={type}
          >
            {type}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].type,
    },
    {
      id: 'price',
      name: 'column.price',
      width: getColumnWidth('price', columnsWidth),
      renderer: (rowIndex) => {
        const { price, amount } = filteredData[rowIndex]
        const color = (amount > 0)
          ? 'green'
          : 'red'
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedFloat(price)}
          >
            {formatAmount(price, { color })}
          </Cell>
        )
      },
      isNumericValue: true,
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].price),
    },
    {
      id: 'amount',
      name: 'column.amount',
      width: getColumnWidth('amount', columnsWidth),
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
      isNumericValue: true,
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].amount),
    },
    {
      id: 'pair',
      name: 'column.pair',
      className: 'align-left',
      width: getColumnWidth('pair', columnsWidth),
      renderer: () => {
        const formattedCurrentPair = formatPair(targetPair)
        return (
          <Cell tooltip={formattedCurrentPair}>
            {formattedCurrentPair}
          </Cell>
        )
      },
      copyText: () => formatPair(targetPair),
    },
  ]
}
