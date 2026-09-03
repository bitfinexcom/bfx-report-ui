import _keys from 'lodash/keys'
import { orderBy } from '@bitfinex/lib-js-util-base'

import { fixedFloat } from 'ui/utils'

// eslint-disable-next-line import/prefer-default-export
export const parseData = (filteredData) => {
  let allBalance = 0
  const summaryData = filteredData.reduce((acc, entry) => {
    const { currency, balanceUsd } = entry
    if (balanceUsd) {
      acc[currency] = (acc[currency] || 0) + balanceUsd
      allBalance += balanceUsd
    }
    return acc
  }, {})

  const tableData = orderBy(_keys(summaryData).map((key) => {
    const balanceUsd = summaryData[key]
    const percent = ((balanceUsd / allBalance) * 100)

    return {
      currency: key,
      balanceUsd,
      percent: fixedFloat(percent),
    }
  }), ['balanceUsd'], ['desc'])

  const chartData = tableData
    .filter(({ percent }) => percent > 0.1)
    .map(({ currency, balanceUsd }) => ({
      name: currency,
      value: balanceUsd,
    }))

  return {
    tableData,
    chartData,
  }
}
