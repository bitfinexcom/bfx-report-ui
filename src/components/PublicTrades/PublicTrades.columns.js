import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { formatAmount, fixedFloat, amountStyle } from 'ui/utils'
import { formatPair } from 'state/symbols/utils'
import { COLUMN_WIDTHS } from 'utils/columns'

export default function getColumns(props) {
  const {
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
      nameStr: `${t('publictrades.column.time')} (${timeOffset})`,
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
      id: 'type',
      name: 'publictrades.column.type',
      width: 70,
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
      name: 'publictrades.column.price',
      width: COLUMN_WIDTHS.AMOUNT,
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
            {formatAmount(price, color)}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].price,
    },
    {
      id: 'amount',
      name: 'publictrades.column.amount',
      width: COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { amount } = filteredData[rowIndex]
        const fixedAmount = fixedFloat(Math.abs(amount))
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedAmount}
          >
            {fixedAmount}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].amount,
    },
    {
      id: 'pair',
      name: 'publictrades.column.pair',
      width: COLUMN_WIDTHS.PAIR,
      renderer: () => {
        const formatedCurrentPair = formatPair(targetPair)
        return (
          <Cell tooltip={formatedCurrentPair}>
            {formatedCurrentPair}
          </Cell>
        )
      },
      copyText: () => formatPair(targetPair),
    },
  ]
}
