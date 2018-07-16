import { connect } from 'react-redux'
import Movements from './Movements'

function mapStateToProps(state = {}) {
  return {
    entries: state.movements.entries,
    loading: !state.movements.dataReceived,
  }
}

const MovementsContainer = connect(mapStateToProps)(Movements)

export default MovementsContainer
