import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchWinLoss, refresh, setParams } from 'state/winLoss/actions'
import {
  getParams,
  getEntries,
  getPageLoading,
  getDataReceived,
  getCurrentFetchParams,
} from 'state/winLoss/selectors'

import AverageWinLoss from './AverageWinLoss'

const mapStateToProps = state => ({
  params: getParams(state),
  entries: getEntries(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
  currentFetchParams: getCurrentFetchParams(state),
})

const mapDispatchToProps = {
  refresh,
  setParams,
  fetchData: fetchWinLoss,
}

const AverageWinLossContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AverageWinLoss))

export default AverageWinLossContainer
