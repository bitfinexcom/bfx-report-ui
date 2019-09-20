import React from 'react'
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
      width: COLUMN_WIDTHS.ORDER_ID,
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
      name: 'orders.column.pair',
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
      id: 'type',
      name: 'orders.column.type',
      width: 135,
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
      id: 'amount',
      name: 'orders.column.amount',
      width: COLUMN_WIDTHS.AMOUNT,
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
      name: 'orders.column.amount-exe',
      width: COLUMN_WIDTHS.AMOUNT,
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
      id: 'price',
      name: 'orders.column.price',
      width: COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { price } = filteredData[rowIndex]
        const fixedPrice = fixedFloat(price)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedPrice}
          >
            {fixedPrice}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].price,
    },
    {
      id: 'priceAvg',
      name: 'orders.column.avgprice',
      width: COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { priceAvg } = filteredData[rowIndex]
        const fixedPrice = fixedFloat(priceAvg)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedPrice}
          >
            {fixedPrice}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].priceAvg,
    },
    {
      id: 'mtsCreate',
      nameStr: `${t('orders.column.create')} (${timeOffset})`,
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
    {
      id: 'mtsUpdate',
      nameStr: `${t('orders.column.update')} (${timeOffset})`,
      width: COLUMN_WIDTHS.DATE,
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
    {
      id: 'status',
      name: 'orders.column.status',
      width: 165,
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
      id: 'priceTrailing',
      name: 'orders.column.pricetrail',
      width: 125,
      renderer: (rowIndex) => {
        const { priceTrailing } = filteredData[rowIndex]
        const fixedPrice = fixedFloat(priceTrailing)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedPrice}
          >
            {fixedPrice}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].priceTrailing,
    },
    {
      id: 'typePrev',
      name: 'orders.column.typeprev',
      width: 145,
      renderer: (rowIndex) => {
        const { typePrev } = filteredData[rowIndex]
        return (
          <Cell tooltip={typePrev}>
            {typePrev}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].typePrev,
    },
  ]
}
