import { connect } from 'react-redux'

import { getTheme } from 'state/base/selectors'
import { setGoToRangePreserve } from 'state/goToRange/actions'
import { getGoToRange, getIsGoToRangePreserved } from 'state/goToRange/selectors'

import Candlestick from './Candlestick'

const mapStateToProps = state => ({
  isGoToRangePreserved: getIsGoToRangePreserved(state),
  timeRange: getGoToRange(state),
  theme: getTheme(state),
})

const mapDispatchToProps = {
  setGoToRangePreserve,
}

export default connect(mapStateToProps, mapDispatchToProps)(Candlestick)
