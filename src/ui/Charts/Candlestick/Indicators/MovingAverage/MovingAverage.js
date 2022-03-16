class MovingAverage {
  constructor(params) {
    this.value = params.value
    this.type = 'MovingAverage'
    this.title = 'MA'
    this.isVisible = true
    this.series = null
  }

  getSeries(chart) {
    this.series = chart.addLineSeries({
      lineWidth: 1,
      lastValueVisible: false,
      priceLineVisible: false,
    })
  }

  getSeriesData(candles) {
    const maLength = this.value
    const maSeries = []
    for (let i = maLength - 1; i < candles.length; i += 1) {
      const { time } = candles[i]
      const actualCandles = candles.slice(i - maLength + 1, i + 1)
      const candlesPrices = actualCandles.map((c) => c.close)
      const sumOfPrices = candlesPrices.reduce((prev, curr) => prev + curr, 0)
      const ma = sumOfPrices / maLength
      maSeries.push({ time, value: +ma.toPrecision(5) })
    }
    return maSeries
  }

  setSeriesData(candles) {
    this.series.setData(this.getSeriesData(candles))
  }

  getStatusTitle() {
    return this.title
  }
}

export default MovingAverage
