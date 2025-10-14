import React from 'react'
import { Cell } from '@blueprintjs/table'
import _round from 'lodash/round'

import { mapSymbol } from 'state/symbols/utils'
import { formatAmount, fixedFloat } from 'ui/utils'
import LoadingPlaceholder from 'ui/LoadingPlaceholder'
import {
  getCell,
  getCellLoader,
  getCellNoData,
  getColumnWidth,
  getTooltipContent,
} from 'utils/columns'

import {
  getIsTotal,
  getPairLabel,
  formatUsdValue,
  getFeePercentCell,
  formatPercentValue,
  prepareNumericValue,
  formatUsdValueChange,
  formatSecondaryPercentValue,
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
      const formattedCurrency = mapSymbol(currency)
      return (
        <Cell tooltip={getTooltipContent(formattedCurrency, t)}>
          {isTotal ? (
            <>
              <span>
                {formattedCurrency}
              </span>
              <br />
              <span className='cell-value secondary-value'>
                {t('summary.by_asset.all_assets')}
              </span>
            </>
          ) : (
            <>
              <span className='cell-value'>
                {formattedCurrency}
              </span>
            </>
          )}
        </Cell>
      )
    },
    copyText: rowIndex => mapSymbol(preparedData[rowIndex]?.currency),
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
      if (isLoading) return getCellLoader(22, 80)
      if (isNoData) return getCellNoData(t('column.noResults'))
      const { pair, leverage } = entries[rowIndex]
      const pairLabel = getPairLabel(t, pair, leverage)
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
      if (isLoading) return getCellLoader(22, 80)
      if (isNoData) return getCellNoData()
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
      if (isLoading) return getCellLoader(22, 80)
      if (isNoData) return getCellNoData()
      const { pl, plPerc } = entries[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(fixedFloat(pl), t)}>
          <>
            <span className='cell-value'>
              {formatAmount(pl)}
            </span>
            <br />
            <span className='cell-value secondary-value'>
              {formatSecondaryPercentValue(plPerc)}
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
      if (isLoading) return getCellLoader(22, 80)
      if (isNoData) return getCellNoData()
      const { liquidationPrice } = entries[rowIndex]
      return getCell(formatAmount(liquidationPrice, { color: 'red' }), t, fixedFloat(liquidationPrice))
    },
    copyText: rowIndex => fixedFloat(entries[rowIndex].liquidationPrice),
  },
  {
    id: 'marginFunding',
    name: 'column.fundingCost',
    width: getColumnWidth('marginFunding', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading) return getCellLoader(22, 80)
      if (isNoData) return getCellNoData()
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
      if (isLoading) return getCellLoader(22, 80)
      if (isNoData) return getCellNoData()
      const { collateral } = entries[rowIndex]
      return getCell(`$${fixedFloat(collateral)}`, t)
    },
    copyText: rowIndex => fixedFloat(entries[rowIndex].collateral),
  },
]

export const getStatisticsColumns = ({
  data,
  isLoading,
}) => [
  {
    id: 'balanceUsd',
    name: 'summary.statistics.balance',
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
            {formatUsdValue(data?.balanceUsd ?? 0)}
          </div>
        )}
      </Cell>
    ),
  },
  {
    id: 'plUsd',
    name: 'summary.statistics.profits',
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
            {formatUsdValueChange(data?.plUsd ?? 0)}
          </div>
        )}
      </Cell>
    ),
  },
  {
    id: 'maxDrawdownPerc',
    name: 'summary.statistics.max_drawdown',
    width: 140,
    renderer: () => (
      <Cell>
        {isLoading ? (
          <LoadingPlaceholder
            height={18}
            baseWidth={60}
          />
        ) : (
          <div className='cell-value'>
            {prepareNumericValue(data?.maxDrawdownPerc ?? 0)}
            %
          </div>
        )}
      </Cell>
    ),
  },
  {
    id: 'volatilityPerc',
    name: 'summary.statistics.volatility',
    width: 140,
    renderer: () => (
      <Cell>
        {isLoading ? (
          <LoadingPlaceholder
            height={18}
            baseWidth={60}
          />
        ) : (
          <div className='cell-value'>
            {prepareNumericValue(data?.volatilityPerc ?? 0)}
            %
          </div>
        )}
      </Cell>
    ),
  },
  {
    id: 'sharpeRatio',
    name: 'summary.statistics.sharpe_ratio',
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
            {_round(data?.sharpeRatio ?? 0, 2)}
          </div>
        )}
      </Cell>
    ),
  },
  {
    id: 'sortinoRatio',
    name: 'summary.statistics.sortino_ratio',
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
            {_round(data?.sortinoRatio ?? 0, 2)}
          </div>
        )}
      </Cell>
    ),
  },
  {
    id: 'volumeUsd',
    name: 'summary.statistics.volume',
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
            {formatUsdValue(data?.volumeUsd ?? 0)}
          </div>
        )}
      </Cell>
    ),
  },
  {
    id: 'depositsWithdrawalsUsd',
    name: 'summary.statistics.deps_withdrawals',
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
            {formatUsdValueChange(data?.depositsWithdrawalsUsd ?? 0)}
          </div>
        )}
      </Cell>
    ),
  },
  {
    id: 'allFeesUsd',
    name: 'summary.statistics.fees',
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
            {formatUsdValue(data?.allFeesUsd ?? 0)}
          </div>
        )}
      </Cell>
    ),
  },
]
