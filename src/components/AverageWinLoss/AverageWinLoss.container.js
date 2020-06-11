import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchWinLoss, refresh, setParams } from 'state/winLoss/actions'
import {
  getCurrentFetchParams,
  getDataReceived,
  getPageLoading,
  getEntries,
  getParams,
} from 'state/winLoss/selectors'

import AverageWinLoss from './AverageWinLoss'

const mapStateToProps = state => ({
  currentFetchParams: getCurrentFetchParams(state),
  entries: getEntries(state),
  params: getParams(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
})

const mapDispatchToProps = {
  fetchData: fetchWinLoss,
  refresh,
  setParams,
}

const AverageWinLossContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AverageWinLoss))

export default AverageWinLossContainer
