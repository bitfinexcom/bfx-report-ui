import { connect } from 'react-redux'

import { getCoins, getCurrencies } from 'state/symbols/selectors'

import MultiSymbolSelector from './MultiSymbolSelector'

const mapStateToProps = state => ({
  coins: getCoins(state),
  currencies: getCurrencies(state),
})

const MultiSymbolSelectorContainer = connect(mapStateToProps)(MultiSymbolSelector)

export default MultiSymbolSelectorContainer
