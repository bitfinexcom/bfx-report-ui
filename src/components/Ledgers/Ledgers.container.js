import { connect } from 'react-redux'

import actions from 'state/ledgers/actions'

import Ledgers from './Ledgers'

function mapStateToProps(state = {}) {
  return {
    offset: state.ledgers.offset,
    currencies: state.ledgers.currencies,
    entries: state.ledgers.entries,
    loading: !state.ledgers.dataReceived,
    pageOffset: state.ledgers.pageOffset,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchLedgers: () => dispatch(actions.fetchLedgers()),
  fetchNextLedgers: () => dispatch(actions.fetchNextLedgers()),
  fetchPrevLedgers: () => dispatch(actions.fetchPrevLedgers()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
})

const LedgersContainer = connect(mapStateToProps, mapDispatchToProps)(Ledgers)

export default LedgersContainer
