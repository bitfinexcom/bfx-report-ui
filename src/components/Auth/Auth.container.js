import { connect } from 'react-redux'

import { getAuthData, getIsShown } from 'state/auth/selectors'

import Auth from './Auth'

const mapStateToProps = state => ({
  authData: getAuthData(state),
  isShown: getIsShown(state),
})

const AuthContainer = connect(mapStateToProps, null)(Auth)

export default AuthContainer
