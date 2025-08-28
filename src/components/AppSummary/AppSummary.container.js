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
import { refresh as refreshSummaryByAsset } from 'state/summaryByAsset/actions'
import { refresh as refreshProfits } from 'state/profits/actions'
import { refresh as refreshPositions } from 'state/positionsActive/actions'
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
import {
  getIsSyncRequired,
  getIsFirstSyncing,
  getShouldRefreshAfterSync,
} from 'state/sync/selectors'
import { setShouldRefreshAfterSync } from 'state/sync/actions'

import AppSummary from './AppSummary'

const mapStateToProps = state => ({
  data: getData(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
  currentTimeFrame: getTimeframe(state),
  isFirstSync: getIsFirstSyncing(state),
  isTurkishSite: getIsTurkishSite(state),
  isSyncRequired: getIsSyncRequired(state),
  shouldRefreshAfterSync: getShouldRefreshAfterSync(state),
  isUnrealizedProfitExcluded: getIsUnrealizedProfitExcluded(state),
})

const mapDispatchToProps = {
  refresh,
  fetchData,
  setParams,
  refreshBalance,
  refreshProfits,
  refreshPositions,
  refreshSummaryByAsset,
  setShouldRefreshAfterSync,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(AppSummary)
