import React, { Fragment } from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { amountStyle } from 'ui/utils'

export default function getColumns(props) {
  const {
    filteredData,
    getFullTime,
    intl,
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
      copyText: rowIndex => filteredData[rowIndex].orderID,
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
      copyText: rowIndex => filteredData[rowIndex].pair,
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
      copyText: rowIndex => filteredData[rowIndex].execAmount,
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
      copyText: rowIndex => filteredData[rowIndex].execPrice,
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
      copyText: (rowIndex) => {
        const { fee, feeCurrency } = filteredData[rowIndex]
        return `${fee} ${feeCurrency}`
      },
    },
    {
      id: 'mts',
      nameStr: `${intl.formatMessage({ id: 'trades.column.time' })} (${timeOffset})`,
      width: 150,
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mtsCreate)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsCreate),
    },
  ]
}
