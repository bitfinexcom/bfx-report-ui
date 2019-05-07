import moment from 'moment-timezone'

import timeframeConstants from 'ui/TimeframeSelector/constants'

import { CURRENCIES } from './constants'

const formatTimestamp = (timestamp, timeframe) => {
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

const parseChartData = ({ data, timeframe, addStartingPoint = true }) => {
  const startingPoint = CURRENCIES.reduce((acc, cur) => {
    acc[cur] = 0
    return acc
  }, {})

  const chartData = data.map((entry) => {
    const { mts } = entry

    const currenciesData = CURRENCIES.reduce((acc, cur) => {
      acc[cur] = entry[cur] && entry[cur].toFixed(2)
      return acc
    }, {})

    return {
      name: formatTimestamp(mts, timeframe),
      ...currenciesData,
    }
  })

  return addStartingPoint
    ? [startingPoint, ...chartData]
    : chartData
}

export default parseChartData
