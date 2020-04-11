import moment from 'moment-timezone'

import timeframeConstants from 'ui/TimeFrameSelector/constants'

import { CURRENCY_USD } from './constants'

const formatValue = val => val && +val.toFixed(2)

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
      [CURRENCY_USD]: formatValue(entry[CURRENCY_USD]),
    }
  })

  return {
    chartData,
    presentCurrencies: [CURRENCY_USD],
  }
}

export const parseLoanReportChartData = ({ data, timeframe, t }) => {
  const chartData = data.map((entry) => {
    const { mts } = entry

    return {
      name: formatTimestamp(mts, timeframe),
      [CURRENCY_USD]: formatValue(entry[CURRENCY_USD]),
      cumulative: formatValue(entry.cumulative),
      perc: formatValue(entry.perc),
    }
  })

  return {
    chartData,
    dataKeys: [
      CURRENCY_USD,
      { key: 'cumulative', name: t('charts.cumulative') },
      { key: 'perc', name: t('charts.percentage') },
    ],
  }
}

export default parseChartData
