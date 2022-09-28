import { connect } from 'react-redux'

import { getInactivePairs, getPairs } from 'state/symbols/selectors'

import PairSelector from './PairSelector'

const mapStateToProps = (state, ownProps) => ({
  inactivePairs: getInactivePairs(state),
  pairs: ownProps.pairs || getPairs(state),
})

const PairSelectorContainer = connect(mapStateToProps)(PairSelector)

export default PairSelectorContainer
