import { connect } from 'react-redux'
import Movements from './Movements'
// import actions from '../../state/auth/actions'

function mapStateToProps(state = {}) {
  return {
    movements: state.movements.movements,
  }
}

// const mapDispatchToProps = dispatch => ({
//   setKey: (key, secret) => {
// dispatch(actions.setApiKey(key, secret))
//   },
// })

const MovementsContainer = connect(mapStateToProps)(Movements)

export default MovementsContainer
