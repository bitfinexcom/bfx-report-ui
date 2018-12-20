import React, { Fragment } from 'react'
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
      width: 85,
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
      id: 'order_id',
      name: 'trades.column.orderid',
      width: 100,
      renderer: (rowIndex) => {
        const { orderID } = filteredData[rowIndex]
        return (
          <Cell tooltip={orderID}>
            {orderID}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].orderID,
    },
    {
      id: 'pair',
      name: 'trades.column.pair',
      width: 80,
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
      id: 'amount',
      name: 'trades.column.amount',
      width: 125,
      renderer: (rowIndex) => {
        const { execAmount } = filteredData[rowIndex]
        const classes = amountStyle(execAmount)
        return (
          <Cell
            className={classes}
            tooltip={execAmount}
          >
            {execAmount}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].execAmount,
    },
    {
      id: 'price',
      name: 'trades.column.price',
      width: 125,
      renderer: (rowIndex) => {
        const { execPrice } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={execPrice}
          >
            {execPrice}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].execPrice,
    },
    {
      id: 'fee',
      name: 'trades.column.fee',
      width: 125,
      renderer: (rowIndex) => {
        const { fee, feeCurrency } = filteredData[rowIndex]
        const tooltip = `${fee} ${feeCurrency}`
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={tooltip}
          >
            <Fragment>
              {fee}
              &nbsp;
              <span className='bitfinex-show-soft'>
                {feeCurrency}
              </span>
            </Fragment>
          </Cell>
        )
      },
      tooltip: (rowIndex) => {
        const { fee, feeCurrency } = filteredData[rowIndex]
        return `${fee} ${feeCurrency}`
      },
    },
    {
      id: 'mts',
      name: 'trades.column.time',
      width: 150,
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
  ]
}
