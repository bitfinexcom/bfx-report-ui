import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  fetchData,
} from 'state/accountSummary/actions'
import {
  setParams,
  refresh as refreshBalance,
} from 'state/accountBalance/actions'
import {
  getData,
  getPageLoading,
  getDataReceived,
} from 'state/accountSummary/selectors'
import {
  getTimeframe,
  getIsUnrealizedProfitExcluded,
} from 'state/accountBalance/selectors'
import { getIsTurkishSite } from 'state/base/selectors'

import AppSummary from './AppSummary'

const mapStateToProps = state => ({
  data: getData(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
  currentTimeFrame: getTimeframe(state),
  isTurkishSite: getIsTurkishSite(state),
  isUnrealizedProfitExcluded: getIsUnrealizedProfitExcluded(state),
})

const mapDispatchToProps = {
  refresh,
  fetchData,
  setParams,
  refreshBalance,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(AppSummary)
