import { connect } from 'react-redux'

import { getTargetQueryLimit } from 'state/query/selectors'
import actions from 'state/base/actions'

import QueryLimitSelector from './QueryLimitSelector'

const mapStateToProps = (state = {}) => ({
  getQueryLimit: getTargetQueryLimit(state),
})

const mapDispatchToProps = dispatch => ({
  setQueryLimit: limit => dispatch(actions.setQueryLimit(limit)),
})

const QueryLimitSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(QueryLimitSelector)

export default QueryLimitSelectorContainer
