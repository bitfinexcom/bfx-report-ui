import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
  fetchAffiliatesEarnings,
} from 'state/affiliatesEarnings/actions'
import { getFilteredEntries } from 'state/pagination/selectors'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getEntries,
  getPageLoading,
  getDataReceived,
  getExistingCoins,
  getTargetSymbols,
} from 'state/affiliatesEarnings/selectors'
import queryConstants from 'state/query/constants'
import { getColumns } from 'state/filters/selectors'
import { getColumnsWidth } from 'state/columns/selectors'

import AffiliatesEarnings from './AffiliatesEarnings'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_AFFILIATES_EARNINGS),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_AFFILIATES_EARNINGS),
  dataReceived: getDataReceived(state),
  entries: getFilteredEntries(state, queryConstants.MENU_AFFILIATES_EARNINGS, getEntries(state)),
  existingCoins: getExistingCoins(state),
  getFullTime: getFullTime(state),
  pageLoading: getPageLoading(state),
  targetSymbols: getTargetSymbols(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  addTargetSymbol,
  clearTargetSymbols,
  fetchData: fetchAffiliatesEarnings,
  refresh,
  removeTargetSymbol,
  setTargetSymbols,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(AffiliatesEarnings)
