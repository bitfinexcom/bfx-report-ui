import { connect } from 'react-redux'

import { getCoins, getCurrencies, getInactiveCurrencies } from 'state/symbols/selectors'

import SymbolSelector from './SymbolSelector'

const mapStateToProps = state => ({
  coins: getCoins(state),
  currencies: getCurrencies(state),
  inactiveCurrencies: getInactiveCurrencies(state),
})

const SymbolSelectorContainer = connect(mapStateToProps)(SymbolSelector)

export default SymbolSelectorContainer
