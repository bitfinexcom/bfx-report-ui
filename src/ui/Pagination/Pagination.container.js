import { connect } from 'react-redux'

import { getTargetQueryLimit } from 'state/query/selectors'
import { getPaginationData } from 'state/pagination/selectors'
import { jumpPage, fetchNext, fetchPrev } from 'state/pagination/actions'

import Pagination from './Pagination'

const mapStateToProps = (state, ownProps) => ({
  limit: getTargetQueryLimit(state, ownProps.target),
  ...getPaginationData(state, ownProps.target),
})

const mapDispatchToProps = {
  jumpPage,
  fetchNext,
  fetchPrev,
}

const PaginationContainer = connect(mapStateToProps, mapDispatchToProps)(Pagination)

export default PaginationContainer
