import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchLedgers,
  refresh,
  addTargetSymbol,
  setParams,
  setTargetSymbols,
  removeTargetSymbol,
} from 'state/ledgers/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getPageLoading,
  getTargetCategory,
  getTargetSymbols,
} from 'state/ledgers/selectors'
import { getColumns } from 'state/filters/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import queryConstants from 'state/query/constants'

import Ledgers from './Ledgers'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_LEDGERS),
  entries: getFilteredEntries(state, queryConstants.MENU_LEDGERS, getEntries(state)),
  existingCoins: getExistingCoins(state),
  getFullTime: getFullTime(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  targetCategory: getTargetCategory(state),
  targetSymbols: getTargetSymbols(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchData: fetchLedgers,
  refresh,
  addTargetSymbol,
  setParams,
  setTargetSymbols,
  removeTargetSymbol,
}

const LedgersContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Ledgers))

export default LedgersContainer
