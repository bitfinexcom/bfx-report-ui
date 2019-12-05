import { connect } from 'react-redux'

import { getTargetQueryLimit } from 'state/query/selectors'
import { setQueryLimit } from 'state/base/actions'

import QueryLimitSelector from './QueryLimitSelector'

const mapStateToProps = state => ({
  getQueryLimit: getTargetQueryLimit(state),
})

const mapDispatchToProps = {
  setQueryLimit,
}

const QueryLimitSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(QueryLimitSelector)

export default QueryLimitSelectorContainer
