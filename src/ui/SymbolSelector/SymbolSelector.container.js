import { connect } from 'react-redux'

import { getFundingCoins, getCurrencies, getInactiveCurrencies } from 'state/symbols/selectors'

import SymbolSelector from './SymbolSelector'

const mapStateToProps = state => ({
  coins: getFundingCoins(state),
  currencies: getCurrencies(state),
  inactiveCurrencies: getInactiveCurrencies(state),
})

const SymbolSelectorContainer = connect(mapStateToProps)(SymbolSelector)

export default SymbolSelectorContainer
