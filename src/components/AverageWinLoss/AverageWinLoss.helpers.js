import moment from 'moment-timezone'

import timeframeConstants from 'ui/TimeframeSelector/constants'

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

const parseChartData = ({ data, timeframe }) => {
  const startingPoint = {
    USD: 0,
    JPY: 0,
    EUR: 0,
    GBP: 0,
  }

  const chartData = data.map((entry) => {
    const {
      mts,
      USD,
      JPY,
      EUR,
      GBP,
    } = entry

    return {
      name: formatTimestamp(mts, timeframe),
      USD: USD && USD.toFixed(2),
      JPY: JPY && JPY.toFixed(2),
      EUR: EUR && EUR.toFixed(2),
      GBP: GBP && GBP.toFixed(2),
    }
  })

  return [startingPoint, ...chartData]
}

export default parseChartData
