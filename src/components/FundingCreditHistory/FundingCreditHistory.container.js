import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchFCredit,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
} from 'state/fundingCreditHistory/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getPageLoading,
  getTargetSymbols,
} from 'state/fundingCreditHistory/selectors'
import { getColumns } from 'state/filters/selectors'
import queryConstants from 'state/query/constants'

import FundingCreditHistory from './FundingCreditHistory'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_FCREDIT),
  entries: getFilteredEntries(state, queryConstants.MENU_FCREDIT, getEntries(state)),
  existingCoins: getExistingCoins(state),
  getFullTime: getFullTime(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  targetSymbols: getTargetSymbols(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchData: fetchFCredit,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
}

const FundingCreditHistoryContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(FundingCreditHistory))

export default FundingCreditHistoryContainer
