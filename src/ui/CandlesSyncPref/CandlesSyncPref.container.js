import { connect } from 'react-redux'

import { editCandlesConf } from 'state/sync/actions'
import { getSyncMode, getCandlesConf } from 'state/sync/selectors'
import { getTimeFrame } from 'state/timeRange/selectors'

import CandlesSyncPref from './CandlesSyncPref'

const mapStateToProps = state => ({
  syncMode: getSyncMode(state),
  config: getCandlesConf(state),
  defaultStartTime: getTimeFrame(state).start,
})

const mapDispatchToProps = {
  editConfig: editCandlesConf,
}

const CandlesSyncPrefContainer = connect(mapStateToProps, mapDispatchToProps)(CandlesSyncPref)

export default CandlesSyncPrefContainer
