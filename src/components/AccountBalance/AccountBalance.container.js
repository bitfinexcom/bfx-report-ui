import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  setParams,
  fetchBalance,
} from 'state/accountBalance/actions'
import {
  getEntries,
  getTimeframe,
  getPageLoading,
  getDataReceived,
  getCurrentFetchParams,
  getIsUnrealizedProfitExcluded,
} from 'state/accountBalance/selectors'

import AccountBalance from './AccountBalance'

const mapStateToProps = state => ({
  currentFetchParams: getCurrentFetchParams(state),
  dataReceived: getDataReceived(state),
  entries: getEntries(state),
  isUnrealizedProfitExcluded: getIsUnrealizedProfitExcluded(state),
  pageLoading: getPageLoading(state),
  timeframe: getTimeframe(state),
})

const mapDispatchToProps = {
  fetchData: fetchBalance,
  refresh,
  setParams,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(AccountBalance)
