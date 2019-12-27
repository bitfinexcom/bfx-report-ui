import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchMovements,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
} from 'state/movements/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import { jumpPage } from 'state/pagination/actions'
import {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getPageLoading,
  getTargetSymbols,
} from 'state/movements/selectors'
import { getColumns } from 'state/filters/selectors'
import queryConstants from 'state/query/constants'

import Movements from './Movements'

const mapStateToProps = state => ({
  columns: getColumns(state, queryConstants.MENU_MOVEMENTS),
  entries: getFilteredEntries(state, queryConstants.MENU_MOVEMENTS, getEntries(state)),
  existingCoins: getExistingCoins(state),
  getFullTime: getFullTime(state),
  loading: !getDataReceived(state),
  pageLoading: getPageLoading(state),
  targetSymbols: getTargetSymbols(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchMovements,
  refresh,
  jumpPage,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
}

const MovementsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Movements))

export default MovementsContainer
