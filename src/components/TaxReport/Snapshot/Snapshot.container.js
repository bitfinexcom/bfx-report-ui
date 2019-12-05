import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchTaxReportSnapshot,
} from 'state/taxReport/actions'
import {
  getSnapshot,
  getSnapshotDataReceived,
} from 'state/taxReport/selectors'

import Snapshot from './Snapshot'

const mapStateToProps = (state, { match }) => ({
  data: getSnapshot(state, match.params.section),
  loading: !getSnapshotDataReceived(state, match.params.section),
})

const mapDispatchToProps = {
  fetchSnapshot: fetchTaxReportSnapshot,
}

const SnapshotContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Snapshot))

export default SnapshotContainer
