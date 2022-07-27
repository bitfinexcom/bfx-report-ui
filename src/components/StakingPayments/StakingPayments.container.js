import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchData,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
} from 'state/stakingPayments/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getPageLoading,
  getTargetSymbols,
} from 'state/stakingPayments/selectors'
import { getColumns } from 'state/filters/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import queryConstants from 'state/query/constants'

import StakingPayments from './StakingPayments'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_SPAYMENTS),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_SPAYMENTS),
  entries: getFilteredEntries(state, queryConstants.MENU_SPAYMENTS, getEntries(state)),
  existingCoins: getExistingCoins(state),
  getFullTime: getFullTime(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  targetSymbols: getTargetSymbols(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchData,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
}

const StakingPaymentsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(StakingPayments))

export default StakingPaymentsContainer
