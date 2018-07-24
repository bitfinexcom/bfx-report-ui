import { connect } from 'react-redux'
import actions from 'state/movements/actions'
import Movements from './Movements'

function mapStateToProps(state = {}) {
  return {
    entries: state.movements.entries,
    loading: !state.movements.dataReceived,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchMovements: () => dispatch(actions.fetchMovements()),
})

const MovementsContainer = connect(mapStateToProps, mapDispatchToProps)(Movements)

export default MovementsContainer
