class BollingerBand {
  constructor(params) {
    this.value = params.value
    this.stdValue = params.stdValue
    this.type = 'BollingerBand'
    this.title = 'BB'
    this.isVisible = true
    this.series = null
  }

  getSeries(chart) {
    this.series = chart.addLineSeries({
      lineWidth: 1,
      color: 'red',
      lastValueVisible: false,
      priceLineVisible: false,
    })
  }

  getSeriesData(candles) {
    const length = this.value
    const stdDev = this.stdValue
    const stdSeries = []
    for (let i = length - 1; i < candles.length; i += 1) {
      const { time } = candles[i]
      const actualCandles = candles.slice(i - length + 1, i + 1)
      const candlesPrices = actualCandles.map((c) => c.close)
      const sumOfPrices = candlesPrices.reduce((prev, curr) => prev + curr, 0)
      const ma = sumOfPrices / length

      const deviations = candlesPrices.map((price) => (price - ma) ** 2)
      const devsSum = deviations.reduce((a, b) => a + b, 0) // Array sum.
      const std = Math.sqrt(devsSum / deviations.length)

      stdSeries.push({ time, value: +(ma + std * stdDev).toPrecision(5) })
    }
    return stdSeries
  }

  setSeriesData(candles) {
    this.series.setData(this.getSeriesData(candles))
  }

  getStatusTitle() {
    return this.title
  }
}

export default BollingerBand
