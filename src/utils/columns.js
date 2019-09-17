import React from 'react'

import { Cell, TruncatedFormat } from '@blueprintjs/table'

import { formatAmount, fixedFloat } from 'ui/utils'

export const getFrameworkPositionsColumns = (props) => {
  const {
    filteredData,
    getFullTime,
    t,
    timeOffset,
  } = props

  function showType(swapType) {
    return swapType
      ? t('positions.swap.term')
      : t('positions.swap.daily')
  }

  return [
    {
      id: 'id',
      name: 'column.id',
      width: 100,
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
        return (
          <Cell tooltip={fixedFloat(amount)}>
            {formatAmount(amount)}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].amount,
    },
    {
      id: 'basePrice',
      name: 'positions.column.base-price',
      width: 100,
      renderer: (rowIndex) => {
        const { basePrice } = filteredData[rowIndex]
        const fixedPrice = fixedFloat(basePrice)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedPrice}
          >
            {fixedPrice}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].basePrice,
    },
    {
      id: 'actualPrice',
      name: 'positions.column.actual-price',
      width: 125,
      renderer: (rowIndex) => {
        const { actualPrice } = filteredData[rowIndex]
        const fixedPrice = fixedFloat(actualPrice)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedPrice}
          >
            {fixedPrice}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].actualPrice,
    },
    {
      id: 'priceLiq',
      name: 'positions.column.liq-price',
      width: 100,
      renderer: (rowIndex) => {
        const { liquidationPrice } = filteredData[rowIndex]
        const fixedPrice = fixedFloat(liquidationPrice)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedPrice}
          >
            {fixedPrice}
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
        return (
          <Cell tooltip={fixedFloat(pl)}>
            {formatAmount(pl)}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].pl,
    },
    {
      id: 'plUsd',
      name: 'positions.column.plUsd',
      width: 125,
      renderer: (rowIndex) => {
        const { plUsd } = filteredData[rowIndex]
        return (
          <Cell tooltip={fixedFloat(plUsd)}>
            {formatAmount(plUsd)}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].plUsd,
    },
    {
      id: 'plperc',
      name: 'positions.column.plperc',
      width: 100,
      renderer: (rowIndex) => {
        const { plPerc } = filteredData[rowIndex]
        return (
          <Cell tooltip={fixedFloat(plPerc)}>
            {formatAmount(plPerc)}
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
        const { marginFunding } = filteredData[rowIndex]
        const fixedSwap = fixedFloat(marginFunding)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedSwap}
          >
            {fixedSwap}
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

export const getPositionsTickersColumns = (props) => {
  const { filteredData } = props

  return [
    {
      id: 'pair',
      name: 'tickers.column.pair',
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
      name: 'snapshots.column.amount',
      width: 120,
      renderer: (rowIndex) => {
        const { amount } = filteredData[rowIndex]
        return (
          <Cell tooltip={fixedFloat(amount)}>
            {formatAmount(amount)}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].amount,
    },
  ]
}

export default {
  getFrameworkPositionsColumns,
  getPositionsTickersColumns,
}
