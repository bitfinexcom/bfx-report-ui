import { connect } from 'react-redux'

import { getPaginationData } from 'state/pagination/selectors'
import { jumpPage, fetchNext } from 'state/pagination/actions'

import Pagination from './Pagination'

const mapStateToProps = (state, ownProps) => ({
  ...getPaginationData(state, ownProps.target),
})

const mapDispatchToProps = {
  jumpPage,
  fetchNext,
}

const PaginationContainer = connect(mapStateToProps, mapDispatchToProps)(Pagination)

export default PaginationContainer
