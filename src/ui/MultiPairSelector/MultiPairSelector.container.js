import { connect } from 'react-redux'

import { getInactivePairs, getPairs } from 'state/symbols/selectors'

import MultiPairSelector from './MultiPairSelector'

const mapStateToProps = (state, ownProps) => ({
  inactivePairs: ownProps.inactivePairs || getInactivePairs(state),
  pairs: ownProps.pairs || getPairs(state),
})

const MultiPairSelectorContainer = connect(mapStateToProps)(MultiPairSelector)

export default MultiPairSelectorContainer
