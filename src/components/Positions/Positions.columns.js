import React, { Fragment } from 'react'

import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { formatTime } from 'state/utils'
import queryConstants from 'state/query/constants'
import { amountStyle } from 'ui/utils'

export default function getColumns(props) {
  const {
    filteredData,
    intl,
    onIdClick,
    target,
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
      width: 100,
      renderer: (rowIndex) => {
        const { id } = filteredData[rowIndex]
        /* eslint-disable jsx-a11y/anchor-is-valid */
        return target === queryConstants.MENU_POSITIONS
          ? (
            <Cell tooltip={id}>
              <Fragment>
                <a href='#' onClick={onIdClick} value={id}>{id}</a>
              </Fragment>
            </Cell>
          )
          : (
            <Cell tooltip={id}>
              {id}
            </Cell>
          )
        /* eslint-enable jsx-a11y/anchor-is-valid */
      },
      tooltip: rowIndex => filteredData[rowIndex].id,
    },
    {
      id: 'pair',
      name: 'positions.column.pair',
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
      name: 'positions.column.amount',
      width: 100,
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
      width: 100,
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
      width: 100,
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
      width: 100,
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
      width: 100,
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
      width: 150,
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
      width: 150,
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
      width: 100,
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
      width: 150,
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
