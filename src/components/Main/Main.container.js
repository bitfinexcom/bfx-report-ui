import { connect } from 'react-redux'
import Main from './Main'

function mapStateToProps(state = {}) {
  return {
    authIsShown: state.auth.isShown,
    authStatus: state.auth.authStatus,
  }
}

const MainContainer = connect(mapStateToProps)(Main)

export default MainContainer
