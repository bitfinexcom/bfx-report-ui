import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(Pagination)
