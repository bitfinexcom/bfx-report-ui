import { connect } from 'react-redux'
import Ledgers from './Ledgers'
// import actions from '../../state/ledgers/actions'

function mapStateToProps(state = {}) {
  return {
    entries: state.ledgers.entries,
  }
}

// const mapDispatchToProps = dispatch => ({
//   setKey: (key) => {
//     dispatch(actions.setApiKey(key))
//   },
// })

const LedgersContainer = connect(mapStateToProps)(Ledgers)

export default LedgersContainer
