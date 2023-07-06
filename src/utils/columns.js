import React from 'react'
import _get from 'lodash/get'
import _map from 'lodash/map'
import _head from 'lodash/head'
import _pick from 'lodash/pick'
import _filter from 'lodash/filter'
import _isEqual from 'lodash/isEqual'

import { Cell, TruncatedFormat } from '@blueprintjs/table'

import { formatAmount, fixedFloat } from 'ui/utils'

const COLUMN_WIDTH_STANDARD = {
  actualPrice: 132,
  amount: 132,
  amountOrig: 132,
  amountUsd: 132,
  amountExecuted: 132,
  ask: 132,
  balance: 132,
  balanceUsd: 137,
  basePrice: 132,
  bid: 132,
  browser: 120,
  buyingAmount: 132,
  buyingWeightedPrice: 160,
  clampMin: 155,
  clampMax: 155,
  collateral: 132,
  cumulativeAmount: 152,
  currency: 92,
  customerInfo: 160,
  date: 150,
  description: 520,
  destinationAddress: 400,
  duration: 70,
  execAmount: 132,
  execPrice: 132,
  extra: 160,
  firstTradeMts: 150,
  fee: 145,
  fees: 145,
  feePercent: 90,
  fundBal: 205,
  fundingAccrued: 185,
  fundingStep: 155,
  id: 95,
  invoices: 160,
  ip: 125,
  lastTradeMts: 150,
  liquidationPrice: 132,
  log: 200,
  marginFunding: 132,
  marginFundingType: 130,
  meta: 160,
  merchantName: 120,
  mobile: 90,
  mts: 150,
  mtsCreate: 150,
  mtsOpening: 150,
  mtsLastPayout: 150,
  mtsUpdate: 150,
  mtsUpdated: 150,
  orderID: 105,
  pair: 110,
  payCurrencies: 160,
  payment: 160,
  period: 80,
  pl: 110,
  plPerc: 110,
  positionPair: 120,
  price: 132,
  priceAvg: 132,
  priceLiq: 132,
  priceSpot: 132,
  priceTrailing: 132,
  rate: 120,
  redirectUrl: 300,
  side: 100,
  sellingAmount: 132,
  sellingWeightedPrice: 160,
  status: 105,
  symbol: 92,
  swap: 132,
  time: 150,
  timestamp: 150,
  transactionId: 135,
  type: 135,
  typePrev: 135,
  userAgent: 160,
  version: 120,
  wallet: 80,
  webhook: 150,
}

const COLUMN_WIDTHS_BIG_SCREENS = {
  actualPrice: 160,
  amount: 160,
  amountOrig: 160,
  amountUsd: 160,
  amountExecuted: 160,
  ask: 160,
  balance: 160,
  balanceUsd: 160,
  basePrice: 160,
  bid: 160,
  browser: 120,
  buyingAmount: 160,
  buyingWeightedPrice: 160,
  clampMin: 155,
  clampMax: 155,
  collateral: 160,
  cumulativeAmount: 160,
  currency: 110,
  customerInfo: 160,
  description: 640,
  destinationAddress: 400,
  duration: 90,
  date: 170,
  execAmount: 160,
  execPrice: 160,
  extra: 160,
  firstTradeMts: 180,
  fee: 180,
  fees: 180,
  feePercent: 115,
  fundBal: 205,
  fundingAccrued: 185,
  fundingStep: 155,
  id: 140,
  ip: 115,
  invoices: 160,
  lastTradeMts: 180,
  liquidationPrice: 160,
  log: 200,
  marginFunding: 160,
  marginFundingType: 130,
  meta: 160,
  merchantName: 140,
  mobile: 90,
  mts: 170,
  mtsCreate: 180,
  mtsOpening: 180,
  mtsLastPayout: 180,
  mtsUpdate: 180,
  mtsUpdated: 180,
  note: 250,
  orderID: 124,
  pair: 120,
  payCurrencies: 160,
  payment: 160,
  period: 100,
  pl: 110,
  plPerc: 110,
  positionPair: 120,
  price: 160,
  priceAvg: 160,
  priceSpot: 160,
  priceLiq: 160,
  priceTrailing: 160,
  rate: 130,
  redirectUrl: 400,
  side: 100,
  sellingAmount: 160,
  sellingWeightedPrice: 170,
  status: 124,
  symbol: 110,
  swap: 160,
  time: 170,
  timestamp: 170,
  transactionId: 165,
  type: 165,
  typePrev: 165,
  userAgent: 160,
  version: 120,
  wallet: 120,
  webhook: 250,
}

export const COLUMN_WIDTHS = window.innerWidth < 2560
  ? COLUMN_WIDTH_STANDARD
  : COLUMN_WIDTHS_BIG_SCREENS

export const pickColumnsWidth = columns => _map(columns,
  column => _pick(column, ['id', 'width']))

export const getColumnWidth = (id, columns) => _head(_filter(columns,
  column => column.id === id))?.width ?? COLUMN_WIDTHS[id]

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
      width: COLUMN_WIDTHS.pair,
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
      width: COLUMN_WIDTHS.amount,
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
      width: COLUMN_WIDTHS.basePrice,
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
      width: COLUMN_WIDTHS.actualPrice,
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
      width: COLUMN_WIDTHS.priceLiq,
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
      width: COLUMN_WIDTHS.swap,
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
      width: COLUMN_WIDTHS.mtsUpdate,
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
      width: COLUMN_WIDTHS.pair,
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
      width: COLUMN_WIDTHS.amount,
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
      isNumericValue: true,
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
      isNumericValue: true,
      copyText: rowIndex => filteredData[rowIndex].amount,
    },
  ]
}

export const singleColumnSelectedCheck = context => _isEqual(
  _get(context, 'selectedRegions[0].cols[0]'),
  _get(context, 'selectedRegions[0].cols[1]'),
)

export const columnHasNumericValueCheck = (context, columns) => {
  const columnIndex = _get(context, 'selectedRegions[0].cols[0]')
  return columns?.[columnIndex]?.isNumericValue ?? false
}

export const formatSumUpValue = value => {
  if (value === 0) return '0'
  return parseFloat(value).toFixed(8).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export default {
  COLUMN_WIDTHS,
  pickColumnsWidth,
  getColumnWidth,
  getFrameworkPositionsColumns,
  getPositionsTickersColumns,
  getWalletsTickersColumns,
  singleColumnSelectedCheck,
  columnHasNumericValueCheck,
  formatSumUpValue,
}
