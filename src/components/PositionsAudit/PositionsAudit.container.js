import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/audit/actions'
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

const mapDispatchToProps = dispatch => ({
  fetchPaudit: ids => dispatch(actions.fetchPAudit(ids)),
  fetchNext: queryLimit => dispatch(actions.fetchNextPAudit(queryLimit)),
  fetchPrev: queryLimit => dispatch(actions.fetchPrevPAudit(queryLimit)),
  jumpPage: (page, queryLimit) => dispatch(actions.jumpPage(page, queryLimit)),
  refresh: () => dispatch(actions.refresh()),
  addTargetId: id => dispatch(actions.addTargetId(id)),
  removeTargetId: id => dispatch(actions.removeTargetId(id)),
})

const PositionsAuditContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PositionsAudit))

export default PositionsAuditContainer
