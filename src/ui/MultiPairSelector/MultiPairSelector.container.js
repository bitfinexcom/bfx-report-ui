import { connect } from 'react-redux'

import { getPairs } from 'state/symbols/selectors'

import MultiPairSelector from './MultiPairSelector'

const mapStateToProps = (state = {}) => ({
  pairs: getPairs(state),
})

const MultiPairSelectorContainer = connect(mapStateToProps)(MultiPairSelector)

export default MultiPairSelectorContainer
