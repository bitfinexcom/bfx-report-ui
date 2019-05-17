import moment from 'moment-timezone'

import timeframeConstants from 'ui/TimeframeSelector/constants'

import { CURRENCIES } from './constants'

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
  const presentCurrencies = CURRENCIES.reduce((acc, currency) => {
    const isPresent = data.find(entry => entry[currency])
    if (isPresent) {
      acc.push(currency)
    }
    return acc
  }, [])

  const chartData = data.map((entry) => {
    const { mts } = entry

    const currenciesData = presentCurrencies.reduce((acc, cur) => {
      acc[cur] = entry[cur] && +entry[cur].toFixed(2)
      return acc
    }, {})

    return {
      name: formatTimestamp(mts, timeframe),
      ...currenciesData,
    }
  })

  return {
    chartData,
    presentCurrencies,
  }
}

export default parseChartData
