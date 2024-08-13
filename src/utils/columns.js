import React from 'react'
import _map from 'lodash/map'
import _sum from 'lodash/sum'
import _size from 'lodash/size'
import _head from 'lodash/head'
import _fill from 'lodash/fill'
import _floor from 'lodash/floor'
import _filter from 'lodash/filter'
import _toLower from 'lodash/toLower'
import _forEach from 'lodash/forEach'
import { Cell } from '@blueprintjs/table'
import { get, pick, isEqual } from '@bitfinex/lib-js-util-base'

import JSONFormat from 'ui/JSONFormat'
import { formatAmount, fixedFloat } from 'ui/utils'
import LoadingPlaceholder from 'ui/LoadingPlaceholder'

const COLUMN_WIDTH_STANDARD = {
  actualPrice: 132,
  amount: 132,
  amountOrig: 132,
  amountUsd: 132,
  amountExecuted: 132,
  ask: 132,
  asset: 92,
  balance: 132,
  balanceChange: 178,
  balanceUsd: 137,
  basePrice: 132,
  bid: 132,
  browser: 120,
  buyingAmount: 132,
  buyingWeightedPrice: 160,
  clampMin: 155,
  clampMax: 155,
  collateral: 132,
  cost: 152,
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
  gainOrLoss: 152,
  id: 95,
  invoices: 160,
  ip: 125,
  lastTradeMts: 150,
  liquidationPrice: 132,
  log: 200,
  marginFunding: 132,
  marginFundingType: 130,
  marginFundingPayment: 178,
  moreDetails: 130,
  meta: 160,
  merchantName: 120,
  mobile: 90,
  mts: 150,
  mtsAcquired: 150,
  mtsCreate: 150,
  mtsOpening: 150,
  mtsLastPayout: 150,
  mtsSold: 150,
  mtsUpdate: 150,
  mtsUpdated: 150,
  note: 135,
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
  proceeds: 152,
  priceTrailing: 132,
  rate: 130,
  redirectUrl: 300,
  sale: 152,
  side: 100,
  sellingAmount: 132,
  sellingWeightedPrice: 160,
  status: 135,
  symbol: 92,
  swap: 132,
  time: 150,
  timestamp: 150,
  transactionId: 135,
  tradingFees: 178,
  type: 135,
  typePrev: 135,
  userAgent: 160,
  version: 120,
  volume: 178,
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
  asset: 110,
  balance: 160,
  balanceChange: 178,
  balanceUsd: 160,
  basePrice: 160,
  bid: 160,
  browser: 120,
  buyingAmount: 160,
  buyingWeightedPrice: 160,
  clampMin: 155,
  clampMax: 155,
  collateral: 160,
  cost: 160,
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
  gainOrLoss: 160,
  id: 140,
  ip: 115,
  invoices: 160,
  lastTradeMts: 180,
  liquidationPrice: 160,
  log: 200,
  marginFunding: 160,
  marginFundingType: 130,
  marginFundingPayment: 178,
  moreDetails: 140,
  meta: 160,
  merchantName: 140,
  mobile: 90,
  mts: 170,
  mtsAcquired: 180,
  mtsCreate: 180,
  mtsOpening: 180,
  mtsLastPayout: 180,
  mtsSold: 180,
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
  proceeds: 160,
  price: 160,
  priceAvg: 160,
  priceSpot: 160,
  priceLiq: 160,
  priceTrailing: 160,
  rate: 130,
  redirectUrl: 400,
  sale: 160,
  side: 100,
  sellingAmount: 160,
  sellingWeightedPrice: 170,
  status: 124,
  symbol: 110,
  swap: 160,
  time: 170,
  timestamp: 170,
  transactionId: 165,
  tradingFees: 178,
  type: 165,
  typePrev: 165,
  userAgent: 160,
  version: 120,
  volume: 178,
  wallet: 120,
  webhook: 250,
}

export const COLUMN_WIDTHS = window.innerWidth < 2560
  ? COLUMN_WIDTH_STANDARD
  : COLUMN_WIDTHS_BIG_SCREENS

export const pickColumnsWidth = columns => _map(columns,
  column => pick(column, ['id', 'width']))

export const getColumnWidth = (id, columns) => _head(_filter(columns,
  column => column.id === id))?.width ?? COLUMN_WIDTHS[id]

export const getTooltipContent = (value, t) => {
  if (t) return `${value}\n${t('column.deselectionHint')}`
  return `${value}`
}

export const getCellLoader = (height, width) => (
  <Cell>
    <LoadingPlaceholder
      height={height}
      baseWidth={width}
    />
  </Cell>
)

export const getCellNoData = (title = '--') => (
  <Cell>
    <>
      <span className='cell-no-data'>
        {title}
      </span>
    </>
  </Cell>
)

export const getCellState = (isLoading, isNoData, noDataTitle) => {
  if (isLoading) return getCellLoader(14, 72)
  if (isNoData) return getCellNoData(noDataTitle)
  return null
}

export const getCell = (content, t, tooltip) => {
  const tooltipContent = getTooltipContent(tooltip || content, t)
  return (
    <Cell tooltip={tooltipContent}>
      {content}
    </Cell>
  )
}

export const getJsonFormattedCell = (value) => {
  const formattedValue = JSON.stringify(value, undefined, 2)
  return (
    <Cell>
      <JSONFormat content={formattedValue}>
        {formattedValue }
      </JSONFormat>
    </Cell>
  )
}

export const getLinkCell = (link) => (
  <Cell>
    <>
      <a
        target='_blank'
        href={`${link}`}
        rel='noopener noreferrer'
      >
        {link}
      </a>
    </>
  </Cell>
)

export const getFeeCell = (fee, feeCurrency, t, tooltip) => {
  const tooltipContent = getTooltipContent(tooltip || fee, t)
  return (
    <Cell tooltip={tooltipContent}>
      <>
        {formatAmount(fee)}
        {' '}
        <span className='bitfinex-show-soft'>
          {feeCurrency}
        </span>
      </>
    </Cell>
  )
}

export const getActionCell = (content, action, t, tooltip) => {
  const tooltipContent = getTooltipContent(tooltip || content, t)
  return (
    <Cell tooltip={tooltipContent}>
      <>
        <a
          href='#'
          onClick={action}
        >
          {t('column.show')}
        </a>
      </>
    </Cell>
  )
}

export const getRowsConfig = (isLoading, isNoData, numRows = 0) => {
  if (isLoading) return 5
  if (isNoData) return 1
  return numRows
}

export const getFrameworkPositionsColumns = ({
  t,
  isNoData,
  isLoading,
  timeOffset,
  getFullTime,
  filteredData,
}) => {
  const showType = (swapType) => (swapType
    ? t('positions.swap.term')
    : t('positions.swap.daily'))

  return [
    {
      id: 'id',
      name: 'column.id',
      className: 'align-left',
      width: 100,
      renderer: (rowIndex) => {
        if (isLoading) return getCellLoader(14, 72)
        if (isNoData) return getCellNoData(t('column.noResults'))
        const { id } = filteredData[rowIndex]
        return (
          <Cell tooltip={getTooltipContent(id, t)}>
            {id}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].id,
    },
    {
      id: 'pair',
      name: 'column.pair',
      className: 'align-left',
      width: COLUMN_WIDTHS.pair,
      renderer: (rowIndex) => {
        if (isLoading) return getCellLoader(14, 72)
        if (isNoData) return getCellNoData()
        const { pair } = filteredData[rowIndex]
        return (
          <Cell tooltip={getTooltipContent(pair, t)}>
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
        if (isLoading) return getCellLoader(14, 72)
        if (isNoData) return getCellNoData()
        const { amount } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(fixedFloat(amount), t)}
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
        if (isLoading) return getCellLoader(14, 72)
        if (isNoData) return getCellNoData()
        const { basePrice } = filteredData[rowIndex]
        const fixedPrice = fixedFloat(basePrice)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(fixedPrice, t)}
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
        if (isLoading) return getCellLoader(14, 72)
        if (isNoData) return getCellNoData()
        const { actualPrice } = filteredData[rowIndex]
        const fixedPrice = fixedFloat(actualPrice)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(fixedPrice, t)}
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
        if (isLoading) return getCellLoader(14, 72)
        if (isNoData) return getCellNoData()
        const { liquidationPrice } = filteredData[rowIndex]
        const fixedPrice = fixedFloat(liquidationPrice)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(fixedPrice, t)}
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
        if (isLoading) return getCellLoader(14, 72)
        if (isNoData) return getCellNoData()
        const { pl } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(fixedFloat(pl), t)}
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
        if (isLoading) return getCellLoader(14, 72)
        if (isNoData) return getCellNoData()
        const { plUsd } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(fixedFloat(plUsd), t)}
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
        if (isLoading) return getCellLoader(14, 72)
        if (isNoData) return getCellNoData()
        const { plPerc } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(fixedFloat(plPerc), t)}
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
        if (isLoading) return getCellLoader(14, 72)
        if (isNoData) return getCellNoData()
        const { marginFunding } = filteredData[rowIndex]
        const fixedSwap = fixedFloat(marginFunding)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(fixedSwap, t)}
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
      className: 'align-left',
      width: 120,
      renderer: (rowIndex) => {
        if (isLoading) return getCellLoader(14, 72)
        if (isNoData) return getCellNoData()
        const swapType = showType(filteredData[rowIndex].marginFundingType)
        return (
          <Cell tooltip={getTooltipContent(swapType, t)}>
            {swapType}
          </Cell>
        )
      },
      copyText: rowIndex => showType(filteredData[rowIndex].marginFundingType),
    },
    {
      id: 'status',
      name: 'column.status',
      className: 'align-left',
      width: 100,
      renderer: (rowIndex) => {
        if (isLoading) return getCellLoader(14, 72)
        if (isNoData) return getCellNoData()
        const { status } = filteredData[rowIndex]
        return (
          <Cell tooltip={getTooltipContent(status, t)}>
            {status}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].status,
    },
    {
      id: 'mtsUpdate',
      className: 'align-left',
      nameStr: `${t('column.updated')} (${timeOffset})`,
      width: COLUMN_WIDTHS.mtsUpdate,
      renderer: (rowIndex) => {
        if (isLoading) return getCellLoader(14, 72)
        if (isNoData) return getCellNoData()
        const timestamp = getFullTime(filteredData[rowIndex].mtsUpdate)
        return (
          <Cell tooltip={getTooltipContent(timestamp, t)}>
            {timestamp}
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsUpdate),
    },
  ]
}

export const getPositionsTickersColumns = ({
  t,
  isNoData,
  isLoading,
  filteredData,
}) => [
  {
    id: 'pair',
    name: 'column.pair',
    className: 'align-left',
    width: COLUMN_WIDTHS.pair,
    renderer: (rowIndex) => {
      if (isLoading) return getCellLoader(14, 72)
      if (isNoData) return getCellNoData(t('column.noResults'))
      const { pair } = filteredData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(pair, t)}>
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
      if (isLoading) return getCellLoader(14, 72)
      if (isNoData) return getCellNoData()
      const { amount } = filteredData[rowIndex]
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(fixedFloat(amount), t)}
        >
          {formatAmount(amount)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => filteredData[rowIndex].amount,
  },
]

export const getWalletsTickersColumns = ({
  t,
  isNoData,
  isLoading,
  filteredData,
}) => [
  {
    id: 'type',
    name: 'column.type',
    className: 'align-left',
    width: 80,
    renderer: (rowIndex) => {
      if (isLoading) return getCellLoader(14, 72)
      if (isNoData) return getCellNoData(t('column.noResults'))
      const { walletType } = filteredData[rowIndex]
      const walletTypeText = t(`wallets.header.${walletType}`)
      return (
        <Cell tooltip={getTooltipContent(walletTypeText, t)}>
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
    className: 'align-left',
    width: 100,
    renderer: (rowIndex) => {
      if (isLoading) return getCellLoader(14, 72)
      if (isNoData) return getCellNoData()
      const { pair } = filteredData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(pair, t)}>
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
      if (isLoading) return getCellLoader(14, 72)
      if (isNoData) return getCellNoData()
      const { amount } = filteredData[rowIndex]
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(fixedFloat(amount), t)}
        >
          {formatAmount(amount)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => filteredData[rowIndex].amount,
  },
]


export const singleColumnSelectedCheck = context => isEqual(
  get(context, 'selectedRegions[0].cols[0]'),
  get(context, 'selectedRegions[0].cols[1]'),
)

export const columnHasNumericValueCheck = (context, columns) => {
  const columnIndex = get(context, 'selectedRegions[0].cols[0]')
  return columns?.[columnIndex]?.isNumericValue ?? false
}

export const formatSumUpValue = value => {
  if (value === 0) return '0'
  return parseFloat(value).toFixed(8).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export const formatSourceType = (type, t) => t(`taxreport.sources.${_toLower(type)}`)

export const MIN_COLUMN_WIDTH = 125
export const WIDE_COLUMN_DEFAULT_WIDTH = 300
export const DEFAULT_CONTAINER_WIDTH = 1000

export const getColumnsMinWidths = (columns) => _map(columns,
  (column) => COLUMN_WIDTHS?.[column.id] ?? MIN_COLUMN_WIDTH)

export const getAverageWidth = (avgWidth) => (avgWidth < MIN_COLUMN_WIDTH
  ? MIN_COLUMN_WIDTH
  : avgWidth)

export const getCalculatedColumnWidths = (columns, containerWidth) => {
  if (_size(columns) === 0) {
    return []
  }

  const colsDefaults = getColumnsMinWidths(columns)
  let avgWidth = getAverageWidth(_floor(containerWidth / _size(columns)))
  const preparedColsWidths = _fill(Array(_size(columns)), 0)
  const wideColsIndexes = []
  const smallColsIndexes = []

  _forEach(colsDefaults, (value, index) => {
    if (value < MIN_COLUMN_WIDTH) smallColsIndexes.push(index)
    if (value > WIDE_COLUMN_DEFAULT_WIDTH) wideColsIndexes.push(index)
  })
  _forEach(wideColsIndexes, (colIndex) => { preparedColsWidths[colIndex] = _floor(avgWidth * 2) })
  _forEach(smallColsIndexes, (colIndex) => { preparedColsWidths[colIndex] = _floor(avgWidth * 0.7) })

  const calculatedCols = _size(smallColsIndexes) + _size(wideColsIndexes)
  avgWidth = getAverageWidth(
    _floor((containerWidth - _sum(preparedColsWidths)) / (_size(columns) - calculatedCols)),
  )
  _forEach(preparedColsWidths, (value, index) => { if (isEqual(value, 0)) preparedColsWidths[index] = avgWidth })

  return preparedColsWidths
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
  getTooltipContent,
  getCalculatedColumnWidths,
  formatSourceType,
  getCell,
  getFeeCell,
  getLinkCell,
  getCellState,
  getActionCell,
  getJsonFormattedCell,
}
