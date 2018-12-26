import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { amountStyle } from 'ui/utils'
import { formatPair } from 'state/symbols/utils'

export default function getColumns(props) {
  const { filteredData, targetPair, getFullTime } = props

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
      name: 'publictrades.column.time',
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
      id: 'type',
      name: 'publictrades.column.type',
      width: 80,
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
      width: 125,
      renderer: (rowIndex) => {
        const { price, amount } = filteredData[rowIndex]
        const classes = amountStyle(amount)
        return (
          <Cell
            className={classes}
            tooltip={price}
          >
            {price}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].price,
    },
    {
      id: 'amount',
      name: 'publictrades.column.amount',
      width: 125,
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
      id: 'pair',
      name: 'publictrades.column.pair',
      width: 100,
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
