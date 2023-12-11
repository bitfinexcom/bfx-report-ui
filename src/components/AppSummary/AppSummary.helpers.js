import React from 'react'
import { fixedFloat, formatThousands } from 'ui/utils'

export const prepareSummaryByAssetData = (entries, total, t) => (
  [...entries, { currency: t('summary.by_asset.total'), ...total }]
)

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

export const getFeeTierVolume = (data) => data?.trade_vol_30d?.at(-1)?.vol_safe ?? 0
