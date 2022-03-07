import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { getInactivePairs, getPairs } from 'state/symbols/selectors'

import MultiPairSelector from './MultiPairSelector'

const mapStateToProps = (state, ownProps) => ({
  pairs: ownProps.pairs || getPairs(state),
  inactivePairs: ownProps.inactivePairs || getInactivePairs(state),
})

export default compose(
  withTranslation('translations'),
  connect(mapStateToProps),
)(MultiPairSelector)
