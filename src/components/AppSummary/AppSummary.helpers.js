import React from 'react'
import { Cell } from '@blueprintjs/table'
import _isNil from 'lodash/isNil'
import _endsWith from 'lodash/endsWith'

import LoadingPlaceholder from 'ui/LoadingPlaceholder'
import { fixedFloat, formatFee, formatThousands } from 'ui/utils'

export const prepareSummaryByAssetData = (entries, total, t, minimumBalance, useMinimumBalance) => {
  const mergedEntries = [...entries, { currency: t('summary.by_asset.total'), ...total }]
  if (useMinimumBalance) {
    return mergedEntries.filter(entry => fixedFloat(entry?.balanceUsd, 2) >= minimumBalance)
  }
  return mergedEntries
}

export const prepareNumericValue = (value) => {
  let val = +fixedFloat(value, 2)
  if (Number.isNaN(val)) val = 0
  return val
}

export const formatUsdValue = (value) => formatThousands(prepareNumericValue(value))

export const formatPercentValue = (value) => {
  const val = prepareNumericValue(value)
  if (val > 0) return <span>{`+${val}%`}</span>
  return <span>{`${val}%`}</span>
}

export const formatUsdValueChange = (value) => {
  const val = prepareNumericValue(value)
  if (val > 0) return <span>{`+$${formatThousands(val)}`}</span>
  if (val < 0) return <span>{`-$${formatThousands(Math.abs(val))}`}</span>
  return <span>{`$${formatThousands(val)}`}</span>
}

export const shouldShowPercentCheck = (balance, balanceChange) => {
  const bal = prepareNumericValue(balance)
  const balChange = prepareNumericValue(balanceChange)
  if (balChange === 0) return true
  if (bal === balChange) return false
  return true
}

export const getIsTotal = (currency, t) => currency === t('summary.by_asset.total')

export const getFeeTierVolume = (data) => data?.trade_vol_30d?.at(-1)?.vol_safe ?? 0

export const getFeePercentCell = (isLoading, value) => (
  <Cell>
    {isLoading ? (
      <LoadingPlaceholder
        height={18}
        baseWidth={60}
      />
    ) : (
      <div className='cell-value'>
        {formatFee(value)}
        %
      </div>
    )}
  </Cell>
)

export const isDerivativePair = (pair) => _endsWith(pair, 'PERP')

export const isPositionPair = (leverage) => _isNill(leverage)

export const formatSecondaryPercentValue = (value) => {
  const val = prepareNumericValue(value)
  if (val > 1) return <span className='percent-pos-value'>{`${val}%`}</span>
  if (val < 1) return <span className='percent-neg-value'>{`${val}%`}</span>
  return <span>{`${val}%`}</span>
}

export const getPairLabel = (t, pair, leverage) => {
  if (_endsWith(pair, 'PERP')) return t('summary.positions.derivative')
  if (_isNil(leverage)) return t('summary.positions.position')
  return t('summary.positions.margin')
}
