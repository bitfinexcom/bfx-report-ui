import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { getFullTime } from 'state/base/selectors'
import { togglePaginationDialog, proceedPaginationRequest } from 'state/ui/actions'
import { getIsPaginationDialogOpen, getLatestPaginationTimestamp } from 'state/ui/selectors'

import PaginationDialog from './PaginationDialog'

const mapStateToProps = state => ({
  getFullTime: getFullTime(state),
  isOpen: getIsPaginationDialogOpen(state),
  latestPaginationTimestamp: getLatestPaginationTimestamp(state),
})

const mapDispatchToProps = {
  toggleDialog: togglePaginationDialog,
  proceedRequest: proceedPaginationRequest,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(PaginationDialog)
