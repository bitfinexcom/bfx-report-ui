import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  setParams,
  fetchLedgers,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
} from 'state/ledgers/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getEntries,
  getPageLoading,
  getDataReceived,
  getExistingCoins,
  getTargetSymbols,
  getTargetCategory,
} from 'state/ledgers/selectors'
import { getColumns } from 'state/filters/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import queryConstants from 'state/query/constants'

import Ledgers from './Ledgers'

const mapStateToProps = state => ({
  getFullTime: getFullTime(state),
  timeOffset: getTimeOffset(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
  targetSymbols: getTargetSymbols(state),
  existingCoins: getExistingCoins(state),
  targetCategory: getTargetCategory(state),
  columns: getColumns(state, queryConstants.MENU_LEDGERS),
  entries: getFilteredEntries(state, queryConstants.MENU_LEDGERS, getEntries(state)),
})

const mapDispatchToProps = {
  refresh,
  setParams,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
  fetchData: fetchLedgers,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(Ledgers)
