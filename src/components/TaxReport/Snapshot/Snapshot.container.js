import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { fetchTaxReportSnapshot, refresh } from 'state/taxReport/actions'
import {
  getSnapshot,
  getSnapshotPageLoading,
  getSnapshotDataReceived,
} from 'state/taxReport/selectors'

import Snapshot from './Snapshot'

const mapStateToProps = (state, { match }) => {
  const { section: snapshotSection } = match.params
  return {
    data: getSnapshot(state, snapshotSection),
    pageLoading: getSnapshotPageLoading(state, snapshotSection),
    dataReceived: getSnapshotDataReceived(state, snapshotSection),
  }
}

const mapDispatchToProps = (dispatch, { match }) => {
  const { section: snapshotSection } = match.params
  return {
    refresh: () => dispatch(refresh({ section: snapshotSection })),
    fetchData: () => dispatch(fetchTaxReportSnapshot(snapshotSection)),
  }
}

export default compose(
  withRouter,
  withTranslation('translations'),
  connect(mapStateToProps, mapDispatchToProps),
)(Snapshot)
