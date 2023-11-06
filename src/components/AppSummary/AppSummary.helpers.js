import React from 'react'
import { fixedFloat, formatThousands } from 'ui/utils'

export const prepareSummaryByAssetData = (entries, total, t) => (
  [...entries, { currency: t('summary.by_asset.total'), ...total }]
)

export const formatUsdValue = (value) => formatThousands(fixedFloat(value, 2))

export const formatPercentValues = (value) => {
  const val = fixedFloat(value, 2)
  if (val > 0) return <span>{`+${val}%`}</span>
  return <span>{`${val}%`}</span>
}
