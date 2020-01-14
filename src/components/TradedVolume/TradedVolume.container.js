import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchTradedVolume,
  refresh,
  addTargetPair,
  removeTargetPair,
  setTargetPairs,
  setParams,
} from 'state/tradedVolume/actions'
import {
  getCurrentFetchParams,
  getDataReceived,
  getEntries,
  getPageLoading,
  getParams,
  getTargetPairs,
} from 'state/tradedVolume/selectors'

import TradedVolume from './TradedVolume'

const mapStateToProps = state => ({
  currentFetchParams: getCurrentFetchParams(state),
  entries: getEntries(state),
  params: getParams(state),
  targetPairs: getTargetPairs(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
})

const mapDispatchToProps = {
  fetchData: fetchTradedVolume,
  refresh,
  setParams,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
}

const TradedVolumeContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TradedVolume))

export default TradedVolumeContainer
