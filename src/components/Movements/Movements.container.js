import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchMovements,
  fetchNextMovements,
  fetchPrevMovements,
  jumpPage,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
} from 'state/movements/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import {
  getDataReceived,
  getEntries,
  getExistingCoins,
  getOffset,
  getPageLoading,
  getPageOffset,
  getTargetSymbols,
  getNextPage,
} from 'state/movements/selectors'

import Movements from './Movements'

const mapStateToProps = (state = {}) => ({
  entries: getEntries(state),
  existingCoins: getExistingCoins(state),
  getFullTime: getFullTime(state),
  loading: !getDataReceived(state),
  nextPage: getNextPage(state),
  offset: getOffset(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  targetSymbols: getTargetSymbols(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchMovements,
  fetchNext: fetchNextMovements,
  fetchPrev: fetchPrevMovements,
  jumpPage,
  refresh,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
}

const MovementsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Movements))

export default MovementsContainer
