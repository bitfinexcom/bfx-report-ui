import { connect } from 'react-redux'

import {
  getCoins,
  getCurrencies,
  getFundingCoins,
  getInactiveCurrencies,
} from 'state/symbols/selectors'

import SymbolSelector from './SymbolSelector'

const mapStateToProps = state => ({
  coins: getCoins(state),
  currencies: getCurrencies(state),
  fundingCoins: getFundingCoins(state),
  inactiveCurrencies: getInactiveCurrencies(state),
})

const SymbolSelectorContainer = connect(mapStateToProps)(SymbolSelector)

export default SymbolSelectorContainer
