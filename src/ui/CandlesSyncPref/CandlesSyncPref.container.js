import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from 'react-i18next'

import { editCandlesConf } from 'state/sync/actions'
import { getCandlesConf, getIsSyncing } from 'state/sync/selectors'
import { getTimeFrame } from 'state/timeRange/selectors'

import CandlesSyncPref from './CandlesSyncPref'

const mapStateToProps = state => ({
  config: getCandlesConf(state),
  isSyncing: getIsSyncing(state),
  defaultStartTime: getTimeFrame(state).start,
})

const mapDispatchToProps = {
  editConfig: editCandlesConf,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(CandlesSyncPref)
