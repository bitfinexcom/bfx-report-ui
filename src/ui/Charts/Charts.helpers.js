import moment from 'moment-timezone'

import timeframeConstants from 'ui/TimeframeSelector/constants'

import { CURRENCY_USD } from './constants'

const formatTimestamp = (timestamp, timeframe) => {
  if (!timestamp) {
    return ''
  }

  const date = moment(timestamp)

  switch (timeframe) {
    case timeframeConstants.DAY:
      return date.format('MMM DD')
    case timeframeConstants.MONTH:
      return date.format('YY MMM')
    case timeframeConstants.YEAR:
      return date.format('YYYY')
    default:
      return ''
  }
}

const parseChartData = ({ data, timeframe }) => {
  const chartData = data.map((entry) => {
    const { mts } = entry

    return {
      name: formatTimestamp(mts, timeframe),
      [CURRENCY_USD]: entry[CURRENCY_USD] && +entry[CURRENCY_USD].toFixed(2),
    }
  })

  return {
    chartData,
    presentCurrencies: [CURRENCY_USD],
  }
}

export default parseChartData
