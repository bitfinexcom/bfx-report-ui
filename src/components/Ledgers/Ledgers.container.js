import { connect } from 'react-redux'

import actions from 'state/ledgers/actions'

import Ledgers from './Ledgers'

function mapStateToProps(state = {}) {
  return {
    allSymbols: state.ledgers.allSymbols,
    offset: state.ledgers.offset,
    currencies: state.ledgers.currencies,
    currentSymbol: state.ledgers.currentSymbol,
    entries: state.ledgers.entries,
    loading: !state.ledgers.dataReceived,
    pageOffset: state.ledgers.pageOffset,
    pageLoading: state.ledgers.pageLoading,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchLedgers: () => dispatch(actions.fetchLedgers()),
  fetchNextLedgers: () => dispatch(actions.fetchNextLedgers()),
  fetchPrevLedgers: () => dispatch(actions.fetchPrevLedgers()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
  setCurrentSymbol: symbol => dispatch(actions.setCurrentSymbol(symbol)),
})

const LedgersContainer = connect(mapStateToProps, mapDispatchToProps)(Ledgers)

export default LedgersContainer
