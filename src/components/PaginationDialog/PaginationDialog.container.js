import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getFullTime } from 'state/base/selectors'
import { getIsPaginationDialogOpen, getLatestPaginationTimestamp } from 'state/ui/selectors'
import { togglePaginationDialog, proceedPaginationRequest } from 'state/ui/actions'

import PaginationDialog from './PaginationDialog'

const mapStateToProps = state => ({
  isOpen: getIsPaginationDialogOpen(state),
  latestPaginationTimestamp: getLatestPaginationTimestamp(state),
  getFullTime: getFullTime(state),
})

const mapDispatchToProps = {
  toggleDialog: togglePaginationDialog,
  proceedRequest: proceedPaginationRequest,
}

const PaginationDialogContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PaginationDialog))

export default PaginationDialogContainer
