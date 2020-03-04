import React from 'react'

import { Cell, TruncatedFormat } from '@blueprintjs/table'

import { formatAmount, fixedFloat } from 'ui/utils'

export const COLUMN_WIDTHS = {
  AMOUNT: 120, // -33942.556789
  BALANCE_USD: 125, // -33942.556789
  DATE: 140, // 18-09-19 17:10:37
  ID: 82, // 123456789
  IP: 115, // 128.128.128.128
  META: 160, // stringified object
  ORDER_ID: 95, // 12345678901
  PAIR: 100, // BTCF0/USTF0
  PERIOD: 80, // 30 Day(s)
  RATE: 120, // 0.00063000
  SYMBOL: 92, // USTF0
}

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
      name: 'column.pair',
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
      name: 'column.amount',
      width: COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { amount } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedFloat(amount)}
          >
            {formatAmount(amount)}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].amount,
    },
    {
      id: 'basePrice',
      name: 'column.base-price',
      width: COLUMN_WIDTHS.AMOUNT,
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
      name: 'column.actual-price',
      width: COLUMN_WIDTHS.AMOUNT,
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
      name: 'column.liq-price',
      width: COLUMN_WIDTHS.AMOUNT,
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
      name: 'column.pl',
      width: 100,
      renderer: (rowIndex) => {
        const { pl } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedFloat(pl)}
          >
            {formatAmount(pl)}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].pl,
    },
    {
      id: 'plUsd',
      name: 'column.plUsd',
      width: 100,
      renderer: (rowIndex) => {
        const { plUsd } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedFloat(plUsd)}
          >
            {formatAmount(plUsd)}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].plUsd,
    },
    {
      id: 'plperc',
      name: 'column.plperc',
      width: 100,
      renderer: (rowIndex) => {
        const { plPerc } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedFloat(plPerc)}
          >
            {formatAmount(plPerc)}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].plPerc,
    },
    {
      id: 'swap',
      name: 'column.fundingCost',
      width: COLUMN_WIDTHS.AMOUNT,
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
      name: 'column.fundingType',
      width: 120,
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
      name: 'column.status',
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
      nameStr: `${t('column.updated')} (${timeOffset})`,
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
  ]
}

export const getPositionsTickersColumns = (props) => {
  const { filteredData } = props

  return [
    {
      id: 'pair',
      name: 'column.pair',
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
      name: 'column.amount',
      width: COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { amount } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedFloat(amount)}
          >
            {formatAmount(amount)}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].amount,
    },
  ]
}

export const getWalletsTickersColumns = (props) => {
  const { filteredData, t } = props

  return [
    {
      id: 'type',
      name: 'column.type',
      width: 80,
      renderer: (rowIndex) => {
        const { walletType } = filteredData[rowIndex]
        const walletTypeText = t(`wallets.header.${walletType}`)
        return (
          <Cell tooltip={walletTypeText}>
            {walletTypeText}
          </Cell>
        )
      },
      copyText: (rowIndex) => {
        const { walletType } = filteredData[rowIndex]
        return t(`wallets.header.${walletType}`)
      },
    },
    {
      id: 'pair',
      name: 'column.pair',
      width: 100,
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
      name: 'column.amount',
      width: 120,
      renderer: (rowIndex) => {
        const { amount } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedFloat(amount)}
          >
            {formatAmount(amount)}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].amount,
    },
  ]
}

export default {
  COLUMN_WIDTHS,
  getFrameworkPositionsColumns,
  getPositionsTickersColumns,
  getWalletsTickersColumns,
}
