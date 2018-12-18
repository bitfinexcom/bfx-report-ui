import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { formatTime } from 'state/utils'
import { amountStyle } from 'ui/utils'

export default function getColumns(props) {
  const { filteredData, timezone } = props

  return [
    {
      id: 'id',
      name: 'column.id',
      renderer: (rowIndex) => {
        const { id } = filteredData[rowIndex]
        return (
          <Cell tooltip={id}>
            {id}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].id,
    },
    {
      id: 'symbol',
      name: 'orders.column.pair',
      renderer: (rowIndex) => {
        const { pair } = filteredData[rowIndex]
        return (
          <Cell tooltip={pair}>
            {pair}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].pair,
    },
    {
      id: 'type',
      name: 'orders.column.type',
      renderer: (rowIndex) => {
        const { type } = filteredData[rowIndex]
        return (
          <Cell tooltip={type}>
            {type}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].type,
    },
    {
      id: 'amount',
      name: 'orders.column.amount',
      renderer: (rowIndex) => {
        const { amountOrig } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={amountOrig}
          >
            {amountOrig}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].amountOrig,
    },
    {
      id: 'amountExecuted',
      name: 'orders.column.amount-exe',
      renderer: (rowIndex) => {
        const { amountExecuted } = filteredData[rowIndex]
        const classes = amountStyle(amountExecuted)
        return (
          <Cell
            className={classes}
            tooltip={amountExecuted}
          >
            {amountExecuted}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].amountExecuted,
    },
    {
      id: 'price',
      name: 'orders.column.price',
      renderer: (rowIndex) => {
        const { price } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={price}
          >
            {price}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].price,
    },
    {
      id: 'priceAvg',
      name: 'orders.column.avgprice',
      renderer: (rowIndex) => {
        const { priceAvg } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={priceAvg}
          >
            {priceAvg}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].priceAvg,
    },
    {
      id: 'mtsCreate',
      name: 'orders.column.create',
      renderer: (rowIndex) => {
        const mtsCreate = formatTime(filteredData[rowIndex].mtsCreate, timezone)
        return (
          <Cell tooltip={mtsCreate}>
            <TruncatedFormat>
              {mtsCreate}
            </TruncatedFormat>
          </Cell>
        )
      },
      tooltip: rowIndex => formatTime(filteredData[rowIndex].mtsCreate, timezone),
    },
    {
      id: 'mtsUpdate',
      name: 'orders.column.update',
      renderer: (rowIndex) => {
        const mtsUpdate = formatTime(filteredData[rowIndex].mtsUpdate, timezone)
        return (
          <Cell tooltip={mtsUpdate}>
            <TruncatedFormat>
              {mtsUpdate}
            </TruncatedFormat>
          </Cell>
        )
      },
      tooltip: rowIndex => formatTime(filteredData[rowIndex].mtsUpdate, timezone),
    },
    {
      id: 'status',
      name: 'orders.column.status',
      renderer: (rowIndex) => {
        const { status } = filteredData[rowIndex]
        return (
          <Cell tooltip={status}>
            {status}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].status,
    },
  ]
}
