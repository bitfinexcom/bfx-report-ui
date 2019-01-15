import { connect } from 'react-redux'

import { getTargetQueryLimit } from 'state/query/selectors'

import Pagination from './Pagination'

const mapStateToProps = (state = {}) => ({
  getQueryLimit: getTargetQueryLimit(state),
})

const PaginationContainer = connect(mapStateToProps)(Pagination)

export default PaginationContainer
