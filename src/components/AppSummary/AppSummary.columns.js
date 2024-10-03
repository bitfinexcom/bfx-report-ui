import React from 'react'
import { Cell } from '@blueprintjs/table'

import { formatAmount, fixedFloat } from 'ui/utils'
import LoadingPlaceholder from 'ui/LoadingPlaceholder'
import {
  getCell,
  getCellState,
  getCellLoader,
  getCellNoData,
  getColumnWidth,
  getTooltipContent,
} from 'utils/columns'

import {
  getIsTotal,
  formatUsdValue,
  isDerivativePair,
  getFeePercentCell,
  formatPercentValue,
  formatUsdValueChange,
} from './AppSummary.helpers'

export const getFeesColumns = ({
  makerFee,
  isLoading,
  feeTierVolume,
  isTurkishSite,
  derivTakerFee,
  takerFeeToFiat,
  takerFeeToStable,
  takerFeeToCrypto,
  derivMakerRebate,
}) => [
  {
    id: 'feeTierVolume',
    name: 'summary.fees.fee_tier_volume',
    width: 100,
    renderer: () => (
      <Cell>
        {isLoading ? (
          <LoadingPlaceholder
            height={18}
            baseWidth={60}
          />
        ) : (
          <div className='cell-value'>
            $
            {formatUsdValue(feeTierVolume)}
          </div>
        )}
      </Cell>
    ),
  },
  {
    id: 'makerFee',
    name: 'summary.fees.maker',
    width: 100,
    renderer: () => (
      getFeePercentCell(isLoading, makerFee)
    ),
  },
  {
    id: 'takerFeeCrypto',
    name: 'summary.fees.taker_crypto',
    width: 140,
    renderer: () => (
      getFeePercentCell(isLoading, takerFeeToCrypto)
    ),
  },
  {
    id: 'takerFeeFiat',
    name: 'summary.fees.taker_fiat',
    width: 140,
    renderer: () => (
      getFeePercentCell(isLoading, takerFeeToFiat)
    ),
  },
  {
    id: 'takerFeeStable',
    name: 'summary.fees.taker_stables',
    width: 140,
    renderer: () => (
      getFeePercentCell(isLoading, takerFeeToStable)
    ),
  },
  ...(!isTurkishSite ? [{
    id: 'derivMakerRebate',
    name: 'summary.fees.deriv_maker',
    width: 140,
    renderer: () => (
      getFeePercentCell(isLoading, derivMakerRebate)
    ),
  },
  {
    id: 'derivTakerFee',
    name: 'summary.fees.deriv_taker',
    width: 140,
    renderer: () => (
      getFeePercentCell(isLoading, derivTakerFee)
    ),
  }] : []),
]

export const getAssetColumns = ({
  t,
  isNoData,
  isLoading,
  preparedData,
  columnsWidth,
}) => [
  {
    id: 'currency',
    className: 'align-left',
    name: 'summary.by_asset.currency',
    width: getColumnWidth('currency', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading) return getCellLoader(22, 80)
      if (isNoData) return getCellNoData(t('column.noResults'))
      const { currency } = preparedData[rowIndex]
      const isTotal = getIsTotal(currency, t)
      return (
        <Cell tooltip={getTooltipContent(currency, t)}>
          {isTotal ? (
            <>
              <span>
                {currency}
              </span>
              <br />
              <span className='cell-value secondary-value'>
                {t('summary.by_asset.all_assets')}
              </span>
            </>
          ) : (
            <>
              <span className='cell-value'>
                {currency}
              </span>
            </>
          )}
        </Cell>
      )
    },
    copyText: rowIndex => preparedData[rowIndex]?.currency,
  },
  {
    id: 'balance',
    name: 'summary.by_asset.balance',
    width: getColumnWidth('balance', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading) return getCellLoader(22, 80)
      if (isNoData) return getCellNoData()
      const { currency, balance = null, balanceUsd = null } = preparedData[rowIndex]
      const isTotal = getIsTotal(currency, t)
      const tooltipContent = isTotal ? balanceUsd : balance
      return (
        <Cell tooltip={getTooltipContent(tooltipContent, t)}>
          {isTotal ? (
            <>
              <span className='cell-value'>
                $
                {formatUsdValue(balanceUsd)}
              </span>
            </>
          ) : (
            <>
              <span className='cell-value'>
                {fixedFloat(balance)}
              </span>
              <br />
              <span className='cell-value secondary-value'>
                $
                {formatUsdValue(balanceUsd)}
              </span>
            </>
          )}
        </Cell>
      )
    },
    copyText: rowIndex => fixedFloat(preparedData[rowIndex]?.balance),
  },
  {
    id: 'balanceChange',
    name: 'summary.by_asset.balance_change',
    width: getColumnWidth('balanceChange', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading) return getCellLoader(22, 80)
      if (isNoData) return getCellNoData()
      const {
        currency, balanceChange, balanceChangeUsd, balanceChangePerc,
      } = preparedData[rowIndex]
      const isTotal = getIsTotal(currency, t)
      const tooltipContent = isTotal ? balanceChangeUsd : balanceChange
      return (
        <Cell tooltip={getTooltipContent(tooltipContent, t)}>
          {isTotal ? (
            <>
              <span className='cell-value'>
                {formatUsdValueChange(balanceChangeUsd)}
              </span>
              <br />
              <span className='cell-value secondary-value'>
                {formatPercentValue(balanceChangePerc)}
              </span>
            </>
          ) : (
            <>
              <span className='cell-value'>
                {fixedFloat(balanceChange)}
              </span>
              <br />
              <span className='cell-value secondary-value'>
                {formatPercentValue(balanceChangePerc)}
              </span>
            </>
          )}
        </Cell>
      )
    },
    copyText: rowIndex => preparedData[rowIndex]?.balanceChange,
  },
  {
    id: 'volume',
    name: 'summary.by_asset.volume',
    width: getColumnWidth('volume', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading) return getCellLoader(22, 80)
      if (isNoData) return getCellNoData()
      const { currency, volume, volumeUsd } = preparedData[rowIndex]
      const isTotal = getIsTotal(currency, t)
      const tooltipContent = isTotal ? volumeUsd : volume
      return (
        <Cell tooltip={getTooltipContent(tooltipContent, t)}>
          {isTotal ? (
            <>
              <span className='cell-value'>
                $
                {formatUsdValue(volumeUsd)}
              </span>
            </>
          ) : (
            <>
              <span className='cell-value'>
                {fixedFloat(volume)}
              </span>
              <br />
              <span className='cell-value secondary-value'>
                $
                {formatUsdValue(volumeUsd)}
              </span>
            </>
          )}
        </Cell>
      )
    },
    copyText: rowIndex => fixedFloat(preparedData[rowIndex]?.volume, 2),
  },
  {
    id: 'tradingFees',
    name: 'summary.by_asset.trading_fees',
    width: getColumnWidth('tradingFees', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading) return getCellLoader(22, 80)
      if (isNoData) return getCellNoData()
      const { tradingFees, tradingFeesUsd, currency } = preparedData[rowIndex]
      const isTotal = getIsTotal(currency, t)
      const tooltipContent = isTotal ? tradingFeesUsd : tradingFees
      return (
        <Cell tooltip={getTooltipContent(tooltipContent, t)}>
          {isTotal ? (
            <>
              <span className='cell-value'>
                $
                {formatUsdValue(tradingFeesUsd)}
              </span>
            </>
          ) : (
            <>
              <span className='cell-value'>
                {fixedFloat(tradingFees)}
              </span>
            </>
          )}
        </Cell>
      )
    },
    copyText: rowIndex => fixedFloat(preparedData[rowIndex]?.tradingFees, 2),
  },
  {
    id: 'marginFundingPayment',
    name: 'summary.by_asset.fund_earnings',
    width: getColumnWidth('marginFundingPayment', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading) return getCellLoader(22, 80)
      if (isNoData) return getCellNoData()
      const { marginFundingPayment, currency } = preparedData[rowIndex]
      const isTotal = getIsTotal(currency, t)
      const tooltipContent = isTotal ? '' : marginFundingPayment
      return (
        <Cell tooltip={getTooltipContent(tooltipContent, t)}>
          {fixedFloat(marginFundingPayment)}
        </Cell>
      )
    },
    copyText: rowIndex => fixedFloat(preparedData[rowIndex]?.marginFundingPayment, 2),
  },
]

export const getPositionsColumns = ({
  t,
  isNoData,
  isLoading,
  entries,
  columnsWidth,
}) => [
  {
    id: 'pair',
    name: 'column.pair',
    className: 'align-left',
    width: getColumnWidth('pair', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { pair } = entries[rowIndex]
      const isDerivative = isDerivativePair(pair)
      const pairLabel = isDerivative
        ? t('summary.positions.derivative')
        : t('summary.positions.margin')
      return (
        <Cell tooltip={getTooltipContent(pair, t)}>
          <>
            <span className='cell-value'>
              {pair}
            </span>
            <br />
            <span className='cell-value secondary-value-left'>
              {pairLabel}
            </span>
          </>
        </Cell>
      )
    },
    copyText: rowIndex => entries[rowIndex].pair,
  },
  {
    id: 'amount',
    name: 'column.amount',
    width: getColumnWidth('amount', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { amount, basePrice } = entries[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(fixedFloat(amount), t)}>
          <>
            <span className='cell-value'>
              {fixedFloat(amount)}
            </span>
            <br />
            <span className='cell-value secondary-value'>
              @
              {fixedFloat(basePrice)}
            </span>
          </>
        </Cell>
      )
    },
    copyText: rowIndex => fixedFloat(entries[rowIndex].amount),
  },
  {
    id: 'pl',
    name: 'column.pl',
    width: getColumnWidth('pl', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { pl, plPerc } = entries[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(fixedFloat(pl), t)}>
          <>
            <span className='cell-value'>
              {formatAmount(pl)}
            </span>
            <br />
            <span className='cell-value secondary-value'>
              {fixedFloat(plPerc, 2)}
              %
            </span>
          </>
        </Cell>
      )
    },
    copyText: rowIndex => fixedFloat(entries[rowIndex].pl),
  },
  {
    id: 'liquidationPrice',
    name: 'column.liq-price',
    width: getColumnWidth('liquidationPrice', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { liquidationPrice } = entries[rowIndex]
      return getCell(fixedFloat(liquidationPrice), t)
    },
    copyText: rowIndex => fixedFloat(entries[rowIndex].liquidationPrice),
  },
  {
    id: 'marginFunding',
    name: 'column.fundingCost',
    width: getColumnWidth('marginFunding', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { marginFunding } = entries[rowIndex]
      return getCell(fixedFloat(marginFunding), t)
    },
    copyText: rowIndex => fixedFloat(entries[rowIndex].marginFunding),
  },
  {
    id: 'collateral',
    name: 'column.collateral',
    width: getColumnWidth('collateral', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { collateral } = entries[rowIndex]
      return getCell(`$${fixedFloat(collateral)}`, t)
    },
    copyText: rowIndex => fixedFloat(entries[rowIndex].collateral),
  },
]
