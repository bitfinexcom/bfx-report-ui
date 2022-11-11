import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  fetchPAudit,
  setTargetIds,
} from 'state/audit/actions'
import {
  getEntries,
  getTargetIds,
  getPageLoading,
  getDataReceived,
} from 'state/audit/selectors'
import queryConstants from 'state/query/constants'
import { getFilteredEntries } from 'state/pagination/selectors'
import { getFullTime, getTimeOffset } from 'state/base/selectors'

import PositionsAudit from './PositionsAudit'

const mapStateToProps = state => ({
  targetIds: getTargetIds(state),
  getFullTime: getFullTime(state),
  timeOffset: getTimeOffset(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
  entries: getFilteredEntries(state, queryConstants.MENU_POSITIONS_AUDIT, getEntries(state)),
})

const mapDispatchToProps = {
  refresh,
  setTargetIds,
  fetchData: fetchPAudit,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(PositionsAudit)
