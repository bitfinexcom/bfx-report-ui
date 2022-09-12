import { connect } from 'react-redux'

import { getTheme } from 'state/base/selectors'
import { setChartScrollTime } from 'state/candles/actions'
import { getChartScrollTime } from 'state/candles/selectors'
import { setGoToRangePreserve } from 'state/goToRange/actions'
import { getGoToRange, getIsGoToRangePreserved } from 'state/goToRange/selectors'

import Candlestick from './Candlestick'

const mapStateToProps = state => ({
  chartScrollTime: getChartScrollTime(state),
  isGoToRangePreserved: getIsGoToRangePreserved(state),
  timeRange: getGoToRange(state),
  theme: getTheme(state),
})

const mapDispatchToProps = {
  setChartScrollTime,
  setGoToRangePreserve,
}

export default connect(mapStateToProps, mapDispatchToProps)(Candlestick)
