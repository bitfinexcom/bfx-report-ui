import { connect } from 'react-redux'

import actions from 'state/movements/actions'

import Movements from './Movements'

function mapStateToProps(state = {}) {
  return {
    offset: state.movements.offset,
    entries: state.movements.entries,
    loading: !state.movements.dataReceived,
    pageOffset: state.movements.pageOffset,
    pageLoading: state.movements.pageLoading,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchMovements: () => dispatch(actions.fetchMovements()),
  fetchNextMovements: () => dispatch(actions.fetchNextMovements()),
  fetchPrevMovements: () => dispatch(actions.fetchPrevMovements()),
  jumpPage: page => dispatch(actions.jumpPage(page)),
})

const MovementsContainer = connect(mapStateToProps, mapDispatchToProps)(Movements)

export default MovementsContainer
