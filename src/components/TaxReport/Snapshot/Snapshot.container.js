import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchTaxReportSnapshot,
} from 'state/taxReport/actions'
import {
  getSnapshot,
  getSnapshotDataReceived,
  getSnapshotPageLoading,
} from 'state/taxReport/selectors'

import Snapshot from './Snapshot'

const mapStateToProps = (state, { match }) => {
  const { section: snapshotSection } = match.params
  return {
    data: getSnapshot(state, snapshotSection),
    dataReceived: getSnapshotDataReceived(state, snapshotSection),
    pageLoading: getSnapshotPageLoading(state, snapshotSection),
  }
}

const mapDispatchToProps = (dispatch, { match }) => {
  const { section: snapshotSection } = match.params
  return {
    fetchData: () => dispatch(fetchTaxReportSnapshot(snapshotSection)),
  }
}

const SnapshotContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Snapshot))

export default SnapshotContainer
