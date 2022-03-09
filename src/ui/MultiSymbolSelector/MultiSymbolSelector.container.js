import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { getCoins, getCurrencies, getInactiveCurrencies } from 'state/symbols/selectors'

import MultiSymbolSelector from './MultiSymbolSelector'

const mapStateToProps = state => ({
  coins: getCoins(state),
  currencies: getCurrencies(state),
  inactiveCurrencies: getInactiveCurrencies(state),
})

export default compose(
  withTranslation('translations'),
  connect(mapStateToProps),
)(MultiSymbolSelector)
