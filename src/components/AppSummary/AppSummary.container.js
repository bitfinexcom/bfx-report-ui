import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { fetchData } from 'state/accountSummary/actions'
import { setParams } from 'state/accountBalance/actions'
import {
  getData,
  getPageLoading,
  getDataReceived,
} from 'state/accountSummary/selectors'
import { getIsTurkishSite } from 'state/base/selectors'
import { getIsSyncRequired, getIsFirstSyncing } from 'state/sync/selectors'

import AppSummary from './AppSummary'

const mapStateToProps = state => ({
  data: getData(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
  isFirstSync: getIsFirstSyncing(state),
  isTurkishSite: getIsTurkishSite(state),
  isSyncRequired: getIsSyncRequired(state),
})

const mapDispatchToProps = {
  fetchData,
  setParams,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(AppSummary)
