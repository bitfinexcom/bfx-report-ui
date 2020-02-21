import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { getTheme } from 'state/base/selectors'

import Candlestick from './Candlestick'

const mapStateToProps = state => ({
  theme: getTheme(state),
})

const CandlestickContainer = connect(mapStateToProps)(Candlestick)

export default withTranslation('translations')(CandlestickContainer)
