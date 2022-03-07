import { connect } from 'react-redux'
import compose from 'lodash/fp/compose'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  fetchAffiliatesEarnings,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
} from 'state/affiliatesEarnings/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getPageLoading,
  getTargetSymbols,
} from 'state/affiliatesEarnings/selectors'
import { getColumns } from 'state/filters/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import queryConstants from 'state/query/constants'

import AffiliatesEarnings from './AffiliatesEarnings'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_AFFILIATES_EARNINGS),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_AFFILIATES_EARNINGS),
  entries: getFilteredEntries(state, queryConstants.MENU_AFFILIATES_EARNINGS, getEntries(state)),
  existingCoins: getExistingCoins(state),
  getFullTime: getFullTime(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  targetSymbols: getTargetSymbols(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchData: fetchAffiliatesEarnings,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(AffiliatesEarnings)
