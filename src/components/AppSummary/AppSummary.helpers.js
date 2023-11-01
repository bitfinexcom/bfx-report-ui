import { fixedFloat, formatThousands } from 'ui/utils'

export const prepareSummaryByAssetData = (entries, total, t) => (
  [...entries, { currency: t('summary.by_asset.total'), ...total }]
)

export const formatUsdValue = (value) => formatThousands(fixedFloat(value, 2))
