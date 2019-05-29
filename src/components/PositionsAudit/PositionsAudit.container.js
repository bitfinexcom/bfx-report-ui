import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchPAudit,
  fetchNextPAudit,
  fetchPrevPAudit,
  jumpPage,
  refresh,
  addTargetId,
  removeTargetId,
} from 'state/audit/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getDataReceived,
  getEntries,
  getNextPage,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetIds,
} from 'state/audit/selectors'

import PositionsAudit from './PositionsAudit'

const mapStateToProps = (state = {}) => ({
  entries: getEntries(state),
  getFullTime: getFullTime(state),
  loading: !getDataReceived(state),
  nextPage: getNextPage(state),
  offset: getOffset(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  targetIds: getTargetIds(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchPaudit: fetchPAudit,
  fetchNext: fetchNextPAudit,
  fetchPrev: fetchPrevPAudit,
  jumpPage,
  refresh,
  addTargetId,
  removeTargetId,
}

const PositionsAuditContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PositionsAudit))

export default PositionsAuditContainer
