import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { getTheme } from 'state/base/selectors'
import { getGoToRange, getIsGoToRangePreserved } from 'state/goToRange/selectors'
import { setGoToRangePreserve } from 'state/goToRange/actions'

import Candlestick from './Candlestick'

const mapStateToProps = state => ({
  theme: getTheme(state),
  timeRange: getGoToRange(state),
  isGoToRangePreserved: getIsGoToRangePreserved(state),
})

const mapDispatchToProps = {
  setGoToRangePreserve,
}

const CandlestickContainer = connect(mapStateToProps, mapDispatchToProps)(Candlestick)

export default withTranslation('translations')(CandlestickContainer)
