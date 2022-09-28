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
  clearTargetSymbols,
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
import { getColumnsWidth } from 'state/columns/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import queryConstants from 'state/query/constants'

import Ledgers from './Ledgers'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_LEDGERS),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_LEDGERS),
  dataReceived: getDataReceived(state),
  entries: getFilteredEntries(state, queryConstants.MENU_LEDGERS, getEntries(state)),
  existingCoins: getExistingCoins(state),
  getFullTime: getFullTime(state),
  pageLoading: getPageLoading(state),
  targetCategory: getTargetCategory(state),
  targetSymbols: getTargetSymbols(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  addTargetSymbol,
  clearTargetSymbols,
  fetchData: fetchLedgers,
  refresh,
  removeTargetSymbol,
  setParams,
  setTargetSymbols,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(Ledgers)
