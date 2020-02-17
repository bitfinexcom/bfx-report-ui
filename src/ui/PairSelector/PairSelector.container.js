import { connect } from 'react-redux'

import { getPairs } from 'state/symbols/selectors'

import PairSelector from './PairSelector'

const mapStateToProps = (state, ownProps) => ({
  pairs: ownProps.pairs || getPairs(state),
})

const PairSelectorContainer = connect(mapStateToProps)(PairSelector)

export default PairSelectorContainer
