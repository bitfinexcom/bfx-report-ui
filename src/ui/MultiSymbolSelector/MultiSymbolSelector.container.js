import { connect } from 'react-redux'

import { getCoins, getCurrencies, getInactiveCurrencies } from 'state/symbols/selectors'

import MultiSymbolSelector from './MultiSymbolSelector'

const mapStateToProps = state => ({
  coins: getCoins(state),
  currencies: getCurrencies(state),
  inactiveCurrencies: getInactiveCurrencies(state),
})

const MultiSymbolSelectorContainer = connect(mapStateToProps)(MultiSymbolSelector)

export default MultiSymbolSelectorContainer
