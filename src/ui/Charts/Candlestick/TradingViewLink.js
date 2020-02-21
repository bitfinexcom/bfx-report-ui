import React from 'react'

const URL = 'https://www.tradingview.com/?utm_source=https://www.bitfinex.com&utm_medium=library&utm_campaign=library'
const openTradingView = () => window.open(URL, '_blank')

const TradingViewLink = () => (
  <div className='candlestick-trading-view' onClick={openTradingView}>
    <svg xmlns='http://www.w3.org/2000/svg' width='33' height='19' viewBox='0 0 33 19'>
      {/* eslint-disable-next-line max-len */}
      <path fill='#37A6EF' d='M29.032 7.382a5.47 5.47 0 0 1 .963 2.872A4.502 4.502 0 0 1 28.5 19H6a5.98 5.98 0 0 1-4.222-1.737l9.546-7.556c.35.187.75.293 1.176.293a2.49 2.49 0 0 0 1.066-.238l4.55 3.981a2.5 2.5 0 1 0 4.711-.157l6.205-6.204zm-1.414-1.414l-6.204 6.204A2.494 2.494 0 0 0 20.5 12a2.49 2.49 0 0 0-1.066.238l-4.55-3.981a2.5 2.5 0 1 0-4.801-.118L.608 15.638A6 6 0 0 1 6.061 7a8.001 8.001 0 0 1 15.625-1.227A5.474 5.474 0 0 1 24.5 5c1.157 0 2.231.358 3.118.968z' />
    </svg>
    <span className='candlestick-trading-view-text'>TradingView</span>
  </div>
)

export default TradingViewLink
