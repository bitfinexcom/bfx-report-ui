import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  fetchData,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
} from 'state/stakingPayments/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import {
  getEntries,
  getPageLoading,
  getDataReceived,
  getExistingCoins,
  getTargetSymbols,
} from 'state/stakingPayments/selectors'
import { getColumns } from 'state/filters/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import queryConstants from 'state/query/constants'

import StakingPayments from './StakingPayments'

const mapStateToProps = state => ({
  getFullTime: getFullTime(state),
  timeOffset: getTimeOffset(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
  existingCoins: getExistingCoins(state),
  targetSymbols: getTargetSymbols(state),
  columns: getColumns(state, queryConstants.MENU_SPAYMENTS),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_SPAYMENTS),
  entries: getFilteredEntries(state, queryConstants.MENU_SPAYMENTS, getEntries(state)),
})

const mapDispatchToProps = {
  refresh,
  fetchData,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(StakingPayments)
