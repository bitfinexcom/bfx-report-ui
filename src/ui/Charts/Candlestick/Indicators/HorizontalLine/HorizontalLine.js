class HorizontalLine {
  constructor(params) {
    this.value = params.value
    this.type = 'HorizontalLine'
    this.title = 'HL'
    this.isVisible = true
    this.series = null
  }

  getSeries(chart) {
    this.series = chart.addLineSeries({
      lastValueVisible: false,
      priceLineVisible: false,
    })
  }

  getSeriesData(candles) {
    return candles.reduce((prev, curr) => {
      prev.push({ time: curr.time, value: this.value })
      return prev
    }, [])
  }

  setSeriesData(candles) {
    this.series.setData(this.getSeriesData(candles))
  }

  getStatusTitle() {
    return this.title
  }
}

export default HorizontalLine
