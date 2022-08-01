import moment from 'moment-timezone'
import _reduce from 'lodash/reduce'
import _values from 'lodash/values'
import _slice from 'lodash/slice'
import _findIndex from 'lodash/findIndex'

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
    case timeframeConstants.WEEK:
      return date.format('WW')
    case timeframeConstants.MONTH:
      return date.format('YY MMM')
    case timeframeConstants.YEAR:
      return date.format('YYYY')
    default:
      return ''
  }
}

export const parseChartData = ({ data, timeframe }) => {
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

export const parseVSAccBalanceChartData = ({ data, timeframe, t }) => {
  const chartData = data.map((entry) => {
    const { mts } = entry

    return {
      name: formatTimestamp(mts, timeframe),
      perc: formatValue(entry.perc),
    }
  })

  return {
    chartData,
    dataKeys: [
      { key: 'perc', name: t('charts.percent') },
    ],
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
      { key: 'perc', name: t('charts.percent') },
    ],
  }
}

export const getPriceFormat = (candles) => {
  const price = +candles[0]?.high
  if (price >= 100) return { minMove: 0.01, precision: 2 }
  if (price >= 10) return { minMove: 0.001, precision: 3 }
  if (price >= 1) return { minMove: 0.0001, precision: 4 }
  if (price < 0.0001) return { minMove: 0.0000001, precision: 7 }
  if (price < 1) return { minMove: 0.00001, precision: 5 }
  return { minMove: 0.01, precision: 2 }
}

export const mergeSimilarTrades = (trades) => _values(
  _reduce(trades, (acc, trade) => {
    if (!acc[trade.orderID]) acc[trade.orderID] = trade
    if (acc[trade.orderID] && acc[trade.orderID].execPrice !== trade.execPrice) {
      acc[trade.execPrice] = trade
    }
    return acc
  }, {}),
)

// Formatting: 1000000 ---> 1,000,000
export const formatChartData = value => new Intl.NumberFormat('en').format(value)

export const formatSumUpValue = (start, end) => formatChartData((start + end).toFixed(2))

export const getSumUpRange = (data, start, end) => {
  const rangeStart = _findIndex(data, entry => entry?.name === start)
  const rangeEnd = _findIndex(data, entry => entry?.name === end)
  const dataRange = [rangeStart, rangeEnd].sort((a, b) => a - b)
  return _slice(data, dataRange[0], dataRange[1] + 1)
}

export default parseChartData
