import { connect } from 'react-redux'

import { getTheme } from 'state/base/selectors'
import { getChartScrollTime } from 'state/candles/selectors'
import { setGoToRangePreserve } from 'state/goToRange/actions'
import { setChartScrollTime, handleChartScrollTime } from 'state/candles/actions'
import { getGoToRange, getIsGoToRangePreserved } from 'state/goToRange/selectors'

import Candlestick from './Candlestick'

const mapStateToProps = state => ({
  chartScrollTime: getChartScrollTime(state),
  isGoToRangePreserved: getIsGoToRangePreserved(state),
  timeRange: getGoToRange(state),
  theme: getTheme(state),
})

const mapDispatchToProps = {
  handleChartScrollTime,
  setChartScrollTime,
  setGoToRangePreserve,
}

export default connect(mapStateToProps, mapDispatchToProps)(Candlestick)
