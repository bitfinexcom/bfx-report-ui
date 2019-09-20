import React, { Fragment } from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { formatAmount, fixedFloat } from 'ui/utils'
import { COLUMN_WIDTHS } from 'utils/columns'

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
      id: 'order_id',
      name: 'trades.column.orderid',
      width: COLUMN_WIDTHS.ORDER_ID,
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
      width: COLUMN_WIDTHS.PAIR,
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
      width: COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { execAmount } = filteredData[rowIndex]
        return (
          <Cell tooltip={fixedFloat(execAmount)}>
            {formatAmount(execAmount)}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].execAmount,
    },
    {
      id: 'price',
      name: 'trades.column.price',
      width: COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { execPrice } = filteredData[rowIndex]
        const fixedPrice = fixedFloat(execPrice)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedPrice}
          >
            {fixedPrice}
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
        const fixedFee = fixedFloat(fee)
        const tooltip = `${fixedFee} ${feeCurrency}`
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={tooltip}
          >
            <Fragment>
              {fixedFee}
              {' '}
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
      nameStr: `${t('trades.column.time')} (${timeOffset})`,
      width: COLUMN_WIDTHS.DATE,
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
