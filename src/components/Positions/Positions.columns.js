import React from 'react'

import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { formatTime } from 'state/utils'
import { amountStyle } from 'ui/utils'

export default function getColumns(props) {
  const {
    filteredData,
    intl,
    timezone,
  } = props

  function showType(swapType) {
    return swapType
      ? intl.formatMessage({ id: 'positions.swap.daily' })
      : intl.formatMessage({ id: 'positions.swap.term' })
  }

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
      id: 'pair',
      name: 'positions.column.pair',
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
      name: 'positions.column.amount',
      renderer: (rowIndex) => {
        const { amount } = filteredData[rowIndex]
        const classes = amountStyle(amount)
        return (
          <Cell
            className={classes}
            tooltip={amount}
          >
            {amount}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].amount,
    },
    {
      id: 'basesPrice',
      name: 'positions.column.base-price',
      renderer: (rowIndex) => {
        const price = filteredData[rowIndex].basePrice
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={price}
          >
            {price}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].basesPrice,
    },
    {
      id: 'priceLiq',
      name: 'positions.column.liq-price',
      renderer: (rowIndex) => {
        const price = filteredData[rowIndex].liquidationPrice
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={price}
          >
            {price}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].liquidationPrice,
    },
    {
      id: 'pl',
      name: 'positions.column.pl',
      renderer: (rowIndex) => {
        const { pl } = filteredData[rowIndex]
        const classes = amountStyle(pl)
        return (
          <Cell
            className={classes}
            tooltip={pl}
          >
            {pl}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].pl,
    },
    {
      id: 'plperc',
      name: 'positions.column.plperc',
      renderer: (rowIndex) => {
        const { plPerc } = filteredData[rowIndex]
        const classes = amountStyle(plPerc)
        return (
          <Cell
            className={classes}
            tooltip={plPerc}
          >
            {plPerc}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].plPerc,
    },
    {
      id: 'swap',
      name: 'positions.column.swap',
      renderer: (rowIndex) => {
        const swap = filteredData[rowIndex].marginFunding
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={swap}
          >
            {swap}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].marginFunding,
    },
    {
      id: 'swapType',
      name: 'positions.column.swap-type',
      renderer: (rowIndex) => {
        const swapType = showType(filteredData[rowIndex].marginFundingType)
        return (
          <Cell tooltip={swapType}>
            {swapType}
          </Cell>
        )
      },
      tooltip: rowIndex => showType(filteredData[rowIndex].marginFundingType),
    },
    {
      id: 'status',
      name: 'positions.column.status',
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
    {
      id: 'mtsUpdate',
      name: 'positions.column.update',
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
  ]
}
