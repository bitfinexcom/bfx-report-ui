import { connect } from 'react-redux'

import { getAuthStatus, getIsShown } from 'state/auth/selectors'

import Main from './Main'

const mapStateToProps = state => ({
  authIsShown: getIsShown(state),
  authStatus: getAuthStatus(state),
})

const MainContainer = connect(mapStateToProps)(Main)

export default MainContainer
