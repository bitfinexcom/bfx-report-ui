import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchPAudit,
  refresh,
  setTargetIds,
} from 'state/audit/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getDataReceived,
  getEntries,
  getPageLoading,
  getTargetIds,
} from 'state/audit/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import queryConstants from 'state/query/constants'

import PositionsAudit from './PositionsAudit'

const mapStateToProps = state => ({
  entries: getFilteredEntries(state, queryConstants.MENU_POSITIONS_AUDIT, getEntries(state)),
  getFullTime: getFullTime(state),
  targetIds: getTargetIds(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchData: fetchPAudit,
  refresh,
  setTargetIds,
}

const PositionsAuditContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PositionsAudit))

export default PositionsAuditContainer
