function getMarkers(trades) {
  return trades.map(trade => ({
    time: trade.time,
    position: 'inBar',
    shape: 'square',
    color: trade.execAmount > 0 ? '#1eb150' : '#f0403f',
  }))
}

class BacktestTrades {
  constructor(params) {
    this.value = 0
    this.trades = params.trades.sort((a, b) => a.mtsCreate - b.mtsCreate)
    this.type = 'BacktestTrades'
    this.title = 'BT'
    this.isVisible = true
    this.series = null
    this.backtestTrades = this.getBacktestTrades()
  }

  getBacktestTrades() {
    return this.trades.map(trade => ({
      ...trade,
      open: trade,
      close: trade.execPrice,
      time: trade.mtsCreate / 1000,
      id: trade.mtsCreate,
      orderId: trade.mtsCreate,
    }))
  }

  getSeries(chart) {
    this.series = chart.addBarSeries({
      thinBars: true,
      openVisible: true,
      downColor: '#102331',
      upColor: '#102331',
    })
  }

  filterTrades(start, end) {
    const trades = [...this.backtestTrades]
    const mtsStart = start * 1000
    const mtsEnd = end * 1000
    let newStart = 0
    let newEnd = trades.length - 1
    for (let i = 0; i < trades.length; i += 1) {
      if (trades[i].mtsCreate > mtsStart) {
        newStart = i
        break
      }
    }
    for (let i = trades.length - 1; i >= 0; i -= 1) {
      if (trades[i].mtsCreate < mtsEnd) {
        newEnd = i
        break
      }
    }
    return trades.slice(newStart, newEnd)
  }

  setSeriesData(candles) {
    const actualTrades = this.filterTrades(
      candles[0].time,
      candles[candles.length - 1].time,
    )
    const markers = getMarkers(actualTrades)
    this.series.setData(actualTrades)
    this.series.setMarkers(markers)
  }

  getStatusTitle() {
    return this.title
  }
}

export default BacktestTrades
