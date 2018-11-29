import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/movements/actions'
import { getTimezone } from 'state/base/selectors'
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
  offset: getOffset(state),
  entries: getEntries(state),
  existingCoins: getExistingCoins(state),
  loading: !getDataReceived(state),
  pageOffset: getPageOffset(state),
  pageLoading: getPageLoading(state),
  targetSymbols: getTargetSymbols(state),
  timezone: getTimezone(state),
  nextPage: getNextPage(state),
})

const mapDispatchToProps = dispatch => ({
  fetchMovements: symbol => dispatch(actions.fetchMovements(symbol)),
  fetchNext: () => dispatch(actions.fetchNextMovements()),
  fetchPrev: () => dispatch(actions.fetchPrevMovements()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
  refresh: () => dispatch(actions.refresh()),
  addTargetSymbol: symbol => dispatch(actions.addTargetSymbol(symbol)),
  removeTargetSymbol: symbol => dispatch(actions.removeTargetSymbol(symbol)),
})

const MovementsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Movements))

export default MovementsContainer
