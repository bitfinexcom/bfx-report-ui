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
    t,
    onIdClick,
    timeOffset,
  } = props

  function showType(swapType) {
    return swapType
      ? t('positions.swap.daily')
      : t('positions.swap.term')
  }

  return [
    {
      id: 'id',
      name: 'column.id',
      width: 100,
      renderer: (rowIndex) => {
        const { id } = filteredData[rowIndex]
        /* eslint-disable jsx-a11y/anchor-is-valid */
        return (
          <Cell tooltip={id}>
            <Fragment>
              <a href='#' onClick={onIdClick} value={id}>{id}</a>
            </Fragment>
          </Cell>
        )
        /* eslint-enable jsx-a11y/anchor-is-valid */
      },
      copyText: rowIndex => filteredData[rowIndex].id,
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
      copyText: rowIndex => filteredData[rowIndex].pair,
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
      copyText: rowIndex => filteredData[rowIndex].amount,
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
      copyText: rowIndex => filteredData[rowIndex].basesPrice,
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
      copyText: rowIndex => filteredData[rowIndex].liquidationPrice,
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
      copyText: rowIndex => filteredData[rowIndex].pl,
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
      copyText: rowIndex => filteredData[rowIndex].plPerc,
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
      copyText: rowIndex => filteredData[rowIndex].marginFunding,
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
      copyText: rowIndex => showType(filteredData[rowIndex].marginFundingType),
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
      copyText: rowIndex => filteredData[rowIndex].status,
    },
    {
      id: 'mtsUpdate',
      nameStr: `${t('positions.column.update')} (${timeOffset})`,
      width: 150,
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
  ]
}
