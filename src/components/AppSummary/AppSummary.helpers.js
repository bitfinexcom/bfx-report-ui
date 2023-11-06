import React from 'react'
import { fixedFloat, formatThousands } from 'ui/utils'

export const prepareSummaryByAssetData = (entries, total, t) => (
  [...entries, { currency: t('summary.by_asset.total'), ...total }]
)

export const formatUsdValue = (value) => formatThousands(fixedFloat(value, 2))

export const formatPercentValues = (value) => {
  let val = fixedFloat(value, 2)
  if (Number.isNaN(val)) val = 0
  if (val > 0) return <span>{`+${val}%`}</span>
  return <span>{`${val}%`}</span>
}

export const formatUsdValueChange = (value) => {
  let val = formatUsdValue(value)
  if (Number.isNaN(val)) val = 0
  if (val > 0) return <span>{`+${val}$`}</span>
  return <span>{`${val}$`}</span>
}
